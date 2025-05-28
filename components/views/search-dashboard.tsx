"use client"

import { useState } from "react"
import { FileText, Link, Search, Clock, Filter, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { querySonar, type SonarCitation } from "@/lib/sonar-service"

interface SearchResult {
  id: string
  title: string
  snippet: string
  source: string
  url: string
  relevance: number
  timestamp: string
  citations: SonarCitation[]
}

const initialSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Global Climate Adaptation Strategies: A Comprehensive Analysis",
    snippet:
      "Recent developments in climate adaptation reveal significant progress in urban resilience planning. Cities implementing green infrastructure show 23% better outcomes...",
    source: "Climate Policy Institute",
    url: "https://example.com/climate-adaptation",
    relevance: 96,
    timestamp: "2024-01-15",
    citations: [
      { title: "IPCC Report 2023", url: "https://example.com/ipcc", source: "ipcc.ch" },
      { title: "Urban Resilience Database", url: "https://example.com/urban", source: "resilience.org" },
      { title: "WHO Climate Health", url: "https://example.com/who", source: "who.int" },
    ],
  },
  {
    id: "2",
    title: "Healthcare System Optimization Through AI-Driven Resource Allocation",
    snippet:
      "Machine learning algorithms demonstrate substantial improvements in healthcare resource distribution, reducing wait times by 34% and improving patient outcomes...",
    source: "Journal of Healthcare Analytics",
    url: "https://example.com/healthcare-ai",
    relevance: 94,
    timestamp: "2024-01-12",
    citations: [
      { title: "Medical AI Review", url: "https://example.com/medical", source: "pubmed.ncbi.nlm.nih.gov" },
      { title: "Healthcare Optimization", url: "https://example.com/optimization", source: "health.org" },
      { title: "Patient Outcome Studies", url: "https://example.com/outcomes", source: "nejm.org" },
    ],
  },
  {
    id: "3",
    title: "Governance Transparency and Digital Democracy Initiatives",
    snippet:
      "Digital governance platforms show promising results in citizen engagement, with participation rates increasing by 67% in pilot programs across multiple jurisdictions...",
    source: "Democratic Innovation Lab",
    url: "https://example.com/digital-democracy",
    relevance: 91,
    timestamp: "2024-01-10",
    citations: [
      { title: "Democracy Index", url: "https://example.com/democracy", source: "economist.com" },
      { title: "Digital Governance", url: "https://example.com/digital", source: "governance.org" },
      { title: "Citizen Engagement Studies", url: "https://example.com/engagement", source: "civictech.org" },
    ],
  },
]

export function SearchDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<SearchResult[]>(initialSearchResults)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "carbon pricing effectiveness urban areas",
    "healthcare AI resource allocation",
    "digital democracy participation rates",
  ])
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["climate", "health"])

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setError(null)

    try {
      const response = await querySonar({
        query: searchQuery,
        mode: "search_citation",
        context: {
          sectors: selectedFilters.length > 0 ? selectedFilters : undefined,
        },
      })

      // Create a new search result from the response
      const newResult: SearchResult = {
        id: Date.now().toString(),
        title: searchQuery,
        snippet: response.answer.substring(0, 200) + (response.answer.length > 200 ? "..." : ""),
        source: "Sonar Search",
        url: "#",
        relevance: response.confidence || 95,
        timestamp: new Date().toISOString(),
        citations: response.citations,
      }

      setSearchResults([newResult, ...searchResults])

      // Add to recent searches if not already there
      if (!recentSearches.includes(searchQuery)) {
        setRecentSearches([searchQuery, ...recentSearches.slice(0, 4)])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process search")
    } finally {
      setIsSearching(false)
    }
  }

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter))
    } else {
      setSelectedFilters([...selectedFilters, filter])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Search className="h-8 w-8 text-blue-600" />
            Search & Citations
          </h2>
          <p className="text-muted-foreground">Real-time search with academic citations and source verification</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>Search across academic papers, policy documents, and real-time data sources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for policies, research, data, or insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 flex-wrap">
            {["Climate Policy", "Public Health", "Governance", "AI Ethics", "Economy", "Education"].map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilters.includes(filter.toLowerCase()) ? "default" : "secondary"}
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => toggleFilter(filter.toLowerCase())}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>{searchResults.length} results found • Sorted by relevance</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-blue-600 hover:underline cursor-pointer">{result.title}</h3>
                        <Badge variant="outline">{result.relevance}% match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{result.snippet}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {result.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {typeof result.timestamp === "string" && result.timestamp.includes("T")
                            ? new Date(result.timestamp).toLocaleDateString()
                            : result.timestamp}
                        </span>
                        {result.url !== "#" && (
                          <span className="flex items-center gap-1">
                            <Link className="h-3 w-3" />
                            <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              View Source
                            </a>
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="text-xs font-medium text-muted-foreground mr-2">Citations:</span>
                        {result.citations.map((citation, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {citation.source}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Sources Indexed</span>
                <span className="text-sm font-bold">2.4M</span>
              </div>
              <div className="text-xs text-muted-foreground">Academic papers, reports, data</div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Search Accuracy</span>
                <span className="text-sm font-bold text-green-600">94.7%</span>
              </div>
              <div className="text-xs text-muted-foreground">Based on user feedback</div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Avg Response Time</span>
                <span className="text-sm font-bold">0.3s</span>
              </div>
              <div className="text-xs text-muted-foreground">Real-time search results</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Searches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer"
                onClick={() => {
                  setSearchQuery(search)
                }}
              >
                <span className="text-sm">{search}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {index === 0 ? "New" : `${Math.floor(Math.random() * 30) + 10} results`}
                  </Badge>
                  <Clock className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
