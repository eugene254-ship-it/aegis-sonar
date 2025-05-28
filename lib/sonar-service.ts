export interface SonarQuery {
  query: string
  mode: "deep_research" | "reasoning_pro" | "search_citation"
  context?: {
    location?: string
    sectors?: string[]
    timeframe?: string
  }
}

export interface SonarCitation {
  title: string
  url: string
  source: string
  snippet?: string
}

export interface SonarResponse {
  answer: string
  citations: SonarCitation[]
  steps?: string[]
  confidence?: number
  processing_time?: number
  cached?: boolean
  cache_timestamp?: string
}

export async function querySonar(query: SonarQuery): Promise<SonarResponse> {
  try {
    const response = await fetch("/api/sonar-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        `API error: ${response.status} ${response.statusText}${errorData.error ? ` - ${errorData.error}` : ""}`,
      )
    }

    return await response.json()
  } catch (error) {
    console.error("Sonar query error:", error)
    throw error
  }
}
