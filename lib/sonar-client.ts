interface SonarQuery {
  query: string
  mode: "deep_research" | "reasoning_pro" | "search_citation"
  context?: {
    location?: string
    sectors?: string[]
    timeframe?: string
  }
}

interface SonarResponse {
  answer: string
  citations: Array<{
    title: string
    url: string
    source: string
    snippet?: string
  }>
  steps?: string[]
  confidence?: number
  processing_time?: number
}

interface SonarApiResponse {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  citations?: Array<{
    title: string
    url: string
    text: string
  }>
}

export class SonarClient {
  private apiKey: string
  private baseUrl = "https://api.perplexity.ai"

  constructor() {
    if (!process.env.SONAR_API_KEY) {
      throw new Error("SONAR_API_KEY environment variable is required")
    }
    this.apiKey = process.env.SONAR_API_KEY
  }

  private getModelForMode(mode: SonarQuery["mode"]): string {
    switch (mode) {
      case "deep_research":
        return "llama-3.1-sonar-large-128k-online"
      case "reasoning_pro":
        return "llama-3.1-sonar-reasoning-128k-online"
      case "search_citation":
        return "llama-3.1-sonar-small-128k-online"
      default:
        return "llama-3.1-sonar-large-128k-online"
    }
  }

  private buildPrompt(query: string, context?: SonarQuery["context"]): string {
    let prompt = query

    if (context) {
      const contextParts: string[] = []

      if (context.location) {
        contextParts.push(`Location: ${context.location}`)
      }

      if (context.sectors && context.sectors.length > 0) {
        contextParts.push(`Focus areas: ${context.sectors.join(", ")}`)
      }

      if (context.timeframe) {
        contextParts.push(`Timeframe: ${context.timeframe}`)
      }

      if (contextParts.length > 0) {
        prompt = `${query}\n\nContext: ${contextParts.join(" | ")}`
      }
    }

    return prompt
  }

  private extractCitations(apiResponse: SonarApiResponse): SonarResponse["citations"] {
    if (!apiResponse.citations) return []

    return apiResponse.citations.map((citation) => ({
      title: citation.title,
      url: citation.url,
      source: this.extractSourceDomain(citation.url),
      snippet: citation.text?.substring(0, 200) + (citation.text?.length > 200 ? "..." : ""),
    }))
  }

  private extractSourceDomain(url: string): string {
    try {
      const domain = new URL(url).hostname
      return domain.replace("www.", "")
    } catch {
      return "Unknown Source"
    }
  }

  private extractReasoningSteps(content: string): string[] {
    // Simple extraction of numbered steps or bullet points
    const stepPattern = /(?:^|\n)(?:\d+\.|[-*])\s+(.+?)(?=\n(?:\d+\.|[-*])|$)/gm
    const steps: string[] = []
    let match

    while ((match = stepPattern.exec(content)) !== null) {
      steps.push(match[1].trim())
    }

    return steps.length > 0 ? steps : []
  }

  async query(sonarQuery: SonarQuery): Promise<SonarResponse> {
    const startTime = Date.now()

    try {
      const model = this.getModelForMode(sonarQuery.mode)
      const prompt = this.buildPrompt(sonarQuery.query, sonarQuery.context)

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are AEGIS, an AI assistant specialized in public health, governance, and climate resilience analysis. Provide comprehensive, well-cited responses with actionable insights.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 4000,
          temperature: 0.2,
          top_p: 0.9,
          return_citations: true,
          search_domain_filter: ["pubmed.ncbi.nlm.nih.gov", "who.int", "cdc.gov", "nature.com", "science.org"],
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          `Sonar API error: ${response.status} ${response.statusText}${errorData ? ` - ${JSON.stringify(errorData)}` : ""}`,
        )
      }

      const apiResponse: SonarApiResponse = await response.json()

      if (!apiResponse.choices || apiResponse.choices.length === 0) {
        throw new Error("No response generated from Sonar API")
      }

      const content = apiResponse.choices[0].message.content
      const citations = this.extractCitations(apiResponse)
      const steps = sonarQuery.mode === "reasoning_pro" ? this.extractReasoningSteps(content) : undefined

      // Calculate a simple confidence score based on number of citations and response length
      const confidence = Math.min(95, Math.max(60, citations.length * 10 + content.length / 100))

      return {
        answer: content,
        citations,
        steps,
        confidence: Math.round(confidence),
        processing_time: Date.now() - startTime,
      }
    } catch (error) {
      console.error("Sonar API Error:", error)
      throw new Error(error instanceof Error ? error.message : "Failed to process Sonar query")
    }
  }
}
