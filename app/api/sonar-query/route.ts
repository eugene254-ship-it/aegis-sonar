import { type NextRequest, NextResponse } from "next/server"
import { SonarClient } from "@/lib/sonar-client"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

interface CachedQuery {
  id: string
  query_hash: string
  query: string
  mode: string
  response: any
  created_at: string
  expires_at: string
}

// Rate limiting store (in production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown"
  return `rate_limit:${ip}`
}

function checkRateLimit(key: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now()
  const userLimit = rateLimitStore.get(key)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userLimit.count >= limit) {
    return false
  }

  userLimit.count++
  return true
}

async function getCachedQuery(queryHash: string): Promise<CachedQuery | null> {
  try {
    const result = await sql`
      SELECT * FROM sonar_cache 
      WHERE query_hash = ${queryHash} 
      AND expires_at > NOW()
      ORDER BY created_at DESC 
      LIMIT 1
    `
    return (result[0] as CachedQuery) || null
  } catch (error) {
    console.error("Cache lookup error:", error)
    return null
  }
}

async function setCachedQuery(queryHash: string, query: string, mode: string, response: any): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    await sql`
      INSERT INTO sonar_cache (query_hash, query, mode, response, expires_at)
      VALUES (${queryHash}, ${query}, ${mode}, ${JSON.stringify(response)}, ${expiresAt.toISOString()})
      ON CONFLICT (query_hash) 
      DO UPDATE SET 
        response = ${JSON.stringify(response)},
        expires_at = ${expiresAt.toISOString()},
        created_at = NOW()
    `
  } catch (error) {
    console.error("Cache storage error:", error)
  }
}

function createQueryHash(query: string, mode: string, context?: any): string {
  const crypto = require("crypto")
  const input = JSON.stringify({ query, mode, context })
  return crypto.createHash("sha256").update(input).digest("hex")
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitKey = getRateLimitKey(request)
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json({ error: "Rate limit exceeded. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    const { query, mode, context } = body

    // Validation
    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 })
    }

    if (!mode || !["deep_research", "reasoning_pro", "search_citation"].includes(mode)) {
      return NextResponse.json(
        { error: "Mode must be one of: deep_research, reasoning_pro, search_citation" },
        { status: 400 },
      )
    }

    // Check cache first
    const queryHash = createQueryHash(query, mode, context)
    const cachedResult = await getCachedQuery(queryHash)

    if (cachedResult) {
      return NextResponse.json({
        ...cachedResult.response,
        cached: true,
        cache_timestamp: cachedResult.created_at,
      })
    }

    // Initialize Sonar client and make request
    const sonarClient = new SonarClient()
    const result = await sonarClient.query({ query, mode, context })

    // Cache the result
    await setCachedQuery(queryHash, query, mode, result)

    // Log successful query (without sensitive data)
    console.log(`Sonar query completed: mode=${mode}, chars=${query.length}, citations=${result.citations.length}`)

    return NextResponse.json({
      ...result,
      cached: false,
    })
  } catch (error) {
    console.error("Sonar API route error:", error)

    // Return appropriate error response
    if (error instanceof Error) {
      if (error.message.includes("Rate limit") || error.message.includes("429")) {
        return NextResponse.json({ error: "API rate limit exceeded. Please try again later." }, { status: 429 })
      }

      if (error.message.includes("401") || error.message.includes("403")) {
        return NextResponse.json({ error: "Authentication failed. Please check API configuration." }, { status: 401 })
      }
    }

    return NextResponse.json({ error: "Internal server error. Please try again later." }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    service: "AEGIS Sonar API",
    version: "1.0.0",
    status: "operational",
    endpoints: {
      query: "POST /api/sonar-query",
    },
    modes: ["deep_research", "reasoning_pro", "search_citation"],
  })
}
