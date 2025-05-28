"use client"

import { useState } from "react"
import { Brain, MessageSquare, Sparkles, BookOpen, Search, FileText, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { querySonar, type SonarQuery, type SonarResponse, type SonarCitation } from "@/lib/sonar-service"

interface ReasoningSession {
  id: string
  query: string
  response: string
  mode: SonarQuery["mode"]
  confidence: number
  timestamp: string
  sources: SonarCitation[]
  steps?: string[]
}

const recentSessions: ReasoningSession[] = [
  {
    id: "1",
    query: "What would be the impact of implementing a carbon tax on urban transportation?",
    response:
      "Based on analysis of 47 similar policies globally, a carbon tax on urban transportation would likely reduce emissions by 12-18% over 5 years, with potential economic impacts including...",
    mode: "deep_research",
    confidence: 87,
    timestamp: "2 hours ago",
    sources: [
      { title: "WHO Climate Report 2024", url: "https://example.com/who-report", source: "who.int" },
      { title: "Urban Policy Database", url: "https://example.com/urban-policy", source: "urbanpolicy.org" },
      { title: "Economic Impact Studies", url: "https://example.com/economic-impact", source: "economics.edu" },
    ],
  },
  {
    id: "2",
    query: "How can we optimize healthcare resource allocation during pandemic scenarios?",
    response:
      "Multi-criteria analysis suggests a hybrid approach combining predictive modeling with real-time resource tracking. Key recommendations include...",
    mode: "reasoning_pro",
    confidence: 92,
    timestamp: "5 hours ago",
    sources: [
      { title: "Pandemic Response Archive", url: "https://example.com/pandemic", source: "cdc.gov" },
      {
        title: "Healthcare Optimization Models",
        url: "https://example.com/healthcare",
        source: "pubmed.ncbi.nlm.nih.gov",
      },
      { title: "WHO Guidelines", url: "https://example.com/who-guidelines", source: "who.int" },
    ],
    steps: [
      "Analyze historical resource utilization patterns during previous pandemics",
      "Identify bottlenecks in current healthcare systems",
      "Apply predictive modeling to forecast demand surges",
      "Develop dynamic resource allocation algorithms",
    ],
  },
]

export function AIReasoningDashboard() {
  const [query, setQuery] = useState("")
  const [mode, setMode] = useState<SonarQuery["mode"]>("deep_research")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sectors, setSectors] = useState<string[]>(["health", "climate"])
  const [location, setLocation] = useState<string>("Global (No specific location)")
  const [currentResponse, setCurrentResponse] = useState<SonarResponse | null>(null)
  const [sessions, setSessions] = useState<ReasoningSession[]>(recentSessions)

  const handleSubmitQuery = async () => {
    if (!query.trim()) return
    setIsProcessing(true)
    setError(null)

    try {
      const context: SonarQuery["context"] = {}
      if (location) context.location = location
      if (sectors.length > 0) context.sectors = sectors

      const sonarQuery: SonarQuery = {
        query,
        mode,
        context,
      }

      const response = await querySonar(sonarQuery)
      setCurrentResponse(response)

      // Add to sessions
      const newSession: ReasoningSession = {
        id: Date.now().toString(),
        query,
        response: response.answer,
        mode,
        confidence: response.confidence || 85,
        timestamp: "Just now",
        sources: response.citations,
        steps: response.steps,
      }

      setSessions([newSession, ...sessions])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process query")
    } finally {
      setIsProcessing(false)
    }
  }

  const getModeIcon = (mode: SonarQuery["mode"]) => {
    switch (mode) {
      case "deep_research":
        return <BookOpen className="h-4 w-4" />
      case "reasoning_pro":
        return <Brain className="h-4 w-4" />
      case "search_citation":
        return <Search className="h-4 w-4" />
    }
  }

  const getModeLabel = (mode: SonarQuery["mode"]) => {
    switch (mode) {
      case "deep_research":
        return "Deep Research"
      case "reasoning_pro":
        return "Reasoning Pro"
      case "search_citation":
        return "Search & Citations"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-600" />
            AI Reasoning Engine
          </h2>
          <p className="text-muted-foreground">
            Advanced long-form reasoning powered by Sonar APIs for complex policy analysis
          </p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
          Sonar Integrated
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              New Reasoning Query
            </CardTitle>
            <CardDescription>
              Ask complex questions about policy impacts, resource optimization, or strategic planning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Query Mode</label>
                <Select value={mode} onValueChange={(value) => setMode(value as SonarQuery["mode"])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deep_research">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Deep Research</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="reasoning_pro">
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        <span>Reasoning Pro</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="search_citation">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span>Search & Citations</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location Context (Optional)</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Global (No specific location)">Global (No specific location)</SelectItem>
                    <SelectItem value="East Africa">East Africa</SelectItem>
                    <SelectItem value="Southeast Asia">Southeast Asia</SelectItem>
                    <SelectItem value="North America">North America</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Urban Centers">Urban Centers</SelectItem>
                    <SelectItem value="Rural Areas">Rural Areas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sectors</label>
              <div className="flex flex-wrap gap-2">
                {["health", "climate", "governance", "economy", "education", "technology"].map((sector) => (
                  <Badge
                    key={sector}
                    variant={sectors.includes(sector) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (sectors.includes(sector)) {
                        setSectors(sectors.filter((s) => s !== sector))
                      } else {
                        setSectors([...sectors, sector])
                      }
                    }}
                  >
                    {sector}
                  </Badge>
                ))}
              </div>
            </div>

            <Textarea
              placeholder="Ask a complex policy or strategic question (e.g., 'What would be the long-term impacts of implementing universal basic income in urban areas?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px]"
            />

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-2">
              <Button
                onClick={handleSubmitQuery}
                disabled={!query.trim() || isProcessing}
                className="flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Reasoning
                  </>
                )}
              </Button>
              <Badge variant="secondary">~30-60 seconds</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reasoning Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Confidence</span>
              <span className="text-2xl font-bold text-green-600">
                {Math.round(sessions.reduce((acc, session) => acc + session.confidence, 0) / sessions.length)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Queries Today</span>
              <span className="text-2xl font-bold">{sessions.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Response Time</span>
              <span className="text-2xl font-bold">
                {currentResponse?.processing_time ? `${Math.round(currentResponse.processing_time / 1000)}s` : "45s"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Success Rate</span>
              <span className="text-2xl font-bold text-blue-600">{currentResponse?.cached ? "100%" : "96.7%"}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {currentResponse && (
        <Card>
          <CardHeader>
            <CardTitle>Current Response</CardTitle>
            <CardDescription>
              {getModeIcon(mode)}
              <span className="ml-1">{getModeLabel(mode)}</span>
              {currentResponse.cached && (
                <Badge variant="outline" className="ml-2">
                  Cached
                </Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="prose max-w-none">
                <p className="whitespace-pre-line">{currentResponse.answer}</p>
              </div>

              {currentResponse.steps && currentResponse.steps.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Reasoning Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-1">
                    {currentResponse.steps.map((step, index) => (
                      <li key={index} className="text-sm">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Sources:</h4>
                <div className="grid gap-2">
                  {currentResponse.citations.map((citation, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <FileText className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <a
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {citation.title}
                        </a>
                        <div className="text-xs text-muted-foreground">{citation.source}</div>
                        {citation.snippet && (
                          <div className="text-xs text-muted-foreground mt-1">{citation.snippet}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              {currentResponse.confidence && <span>Confidence: {currentResponse.confidence}% • </span>}
              {currentResponse.processing_time && (
                <span>Generated in {(currentResponse.processing_time / 1000).toFixed(1)}s</span>
              )}
            </div>
            <Button variant="outline" size="sm">
              Save to Library
            </Button>
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Reasoning Sessions</CardTitle>
          <CardDescription>Browse previous AI reasoning outputs and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="high-confidence">High Confidence</TabsTrigger>
              <TabsTrigger value="complex">Complex Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="space-y-4 mt-4">
              <ScrollArea className="h-[400px]">
                {sessions.map((session) => (
                  <Card key={session.id} className="mb-4">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base font-medium">{session.query}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            {getModeIcon(session.mode)}
                            {getModeLabel(session.mode)} • {session.timestamp}
                          </CardDescription>
                        </div>
                        <Badge variant={session.confidence > 85 ? "default" : "secondary"}>
                          {session.confidence}% confidence
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{session.response}</p>
                      <div className="flex flex-wrap gap-1">
                        {session.sources.slice(0, 3).map((source, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {source.source}
                          </Badge>
                        ))}
                        {session.sources.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{session.sources.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="high-confidence">
              <div className="text-center py-8 text-muted-foreground">High confidence sessions will appear here</div>
            </TabsContent>
            <TabsContent value="complex">
              <div className="text-center py-8 text-muted-foreground">Complex analysis sessions will appear here</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
