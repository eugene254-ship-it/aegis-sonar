"use client"

import { useState } from "react"
import { Brain, MessageSquare, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ReasoningSession {
  id: string
  query: string
  response: string
  confidence: number
  timestamp: string
  sources: string[]
}

const recentSessions: ReasoningSession[] = [
  {
    id: "1",
    query: "What would be the impact of implementing a carbon tax on urban transportation?",
    response:
      "Based on analysis of 47 similar policies globally, a carbon tax on urban transportation would likely reduce emissions by 12-18% over 5 years, with potential economic impacts including...",
    confidence: 87,
    timestamp: "2 hours ago",
    sources: ["WHO Climate Report 2024", "Urban Policy Database", "Economic Impact Studies"],
  },
  {
    id: "2",
    query: "How can we optimize healthcare resource allocation during pandemic scenarios?",
    response:
      "Multi-criteria analysis suggests a hybrid approach combining predictive modeling with real-time resource tracking. Key recommendations include...",
    confidence: 92,
    timestamp: "5 hours ago",
    sources: ["Pandemic Response Archive", "Healthcare Optimization Models", "WHO Guidelines"],
  },
]

export function AIReasoningDashboard() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmitQuery = () => {
    if (!query.trim()) return
    setIsProcessing(true)
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false)
      setQuery("")
    }, 3000)
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
          Beta Release
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
            <Textarea
              placeholder="Ask a complex policy or strategic question (e.g., 'What would be the long-term impacts of implementing universal basic income in urban areas?')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px]"
            />
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
              <span className="text-2xl font-bold text-green-600">89.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Queries Today</span>
              <span className="text-2xl font-bold">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avg Response Time</span>
              <span className="text-2xl font-bold">45s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Success Rate</span>
              <span className="text-2xl font-bold text-blue-600">96.7%</span>
            </div>
          </CardContent>
        </Card>
      </div>

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
                {recentSessions.map((session) => (
                  <Card key={session.id} className="mb-4">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base font-medium">{session.query}</CardTitle>
                        <Badge variant={session.confidence > 85 ? "default" : "secondary"}>
                          {session.confidence}% confidence
                        </Badge>
                      </div>
                      <CardDescription>{session.timestamp}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{session.response}</p>
                      <div className="flex flex-wrap gap-1">
                        {session.sources.map((source, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
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
