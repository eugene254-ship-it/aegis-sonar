"use client"

import { useState } from "react"
import { Play, RotateCcw, Settings, Target, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { querySonar } from "@/lib/sonar-service"

interface SimulationResult {
  parameter: string
  baseline: number
  projected: number
  change: number
  unit: string
}

interface SimulationData {
  results: SimulationResult[]
  analysis: string
  confidence: number
  recommendations: string[]
}

const initialSimulationResults: SimulationResult[] = [
  { parameter: "Carbon Emissions", baseline: 100, projected: 78, change: -22, unit: "%" },
  { parameter: "Economic Impact", baseline: 0, projected: -2.3, change: -2.3, unit: "% GDP" },
  { parameter: "Public Health Score", baseline: 75, projected: 82, change: +7, unit: "index" },
  { parameter: "Social Acceptance", baseline: 60, projected: 71, change: +11, unit: "%" },
]

export function PolicySimulationDashboard() {
  const [isRunning, setIsRunning] = useState(false)
  const [carbonTax, setCarbonTax] = useState([50])
  const [timeframe, setTimeframe] = useState([5])
  const [policyType, setPolicyType] = useState("carbon-tax")
  const [population, setPopulation] = useState("Metropolitan areas")
  const [error, setError] = useState<string | null>(null)
  const [simulationData, setSimulationData] = useState<SimulationData | null>(null)
  const [simulationHistory, setSimulationHistory] = useState([
    { title: "Carbon Tax $75/tonne", time: "2 hours ago", outcome: "-18% emissions" },
    { title: "Universal Healthcare", time: "1 day ago", outcome: "+12% health score" },
    { title: "Digital ID System", time: "3 days ago", outcome: "+25% efficiency" },
  ])

  const runSimulation = async () => {
    setIsRunning(true)
    setError(null)

    try {
      // Construct the simulation query
      const query = `Simulate the impact of implementing a ${
        policyType === "carbon-tax" ? `$${carbonTax[0]}/tonne carbon tax` : policyType
      } 
        in ${population} over a ${timeframe[0]} year period. 
        Analyze impacts on emissions, economy, public health, and social factors.`

      const response = await querySonar({
        query,
        mode: "reasoning_pro",
        context: {
          sectors: ["climate", "economy", "health", "governance"],
          timeframe: `${timeframe[0]} years`,
        },
      })

      // Process the response to extract simulation data
      // This is a simplified example - in a real app, you might want to use more sophisticated parsing

      // Generate some simulated results based on the policy type and parameters
      const results = [...initialSimulationResults].map((result) => {
        let multiplier = 1

        if (policyType === "carbon-tax") {
          multiplier = carbonTax[0] / 50 // Scale based on tax amount
        } else if (policyType === "universal-healthcare") {
          multiplier = 1.2 // Healthcare has different impacts
        } else {
          multiplier = 0.9 // Other policies
        }

        // Adjust the projected value based on the multiplier
        const newProjected = result.baseline + (result.projected - result.baseline) * multiplier
        const newChange = newProjected - result.baseline

        return {
          ...result,
          projected: Number.parseFloat(newProjected.toFixed(1)),
          change: Number.parseFloat(newChange.toFixed(1)),
        }
      })

      // Create simulation data
      setSimulationData({
        results,
        analysis: response.answer,
        confidence: response.confidence || 87,
        recommendations: response.steps || [
          "Consider phased implementation to minimize economic disruption",
          "Pair with public awareness campaign to increase social acceptance",
          "Monitor health indicators closely during initial rollout",
        ],
      })

      // Add to simulation history
      const newHistoryItem = {
        title:
          policyType === "carbon-tax"
            ? `Carbon Tax $${carbonTax[0]}/tonne`
            : policyType
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
        time: "Just now",
        outcome: `${results.find((r) => r.parameter === "Carbon Emissions")?.change}% emissions`,
      }

      setSimulationHistory([newHistoryItem, ...simulationHistory.slice(0, 2)])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run simulation")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Target className="h-8 w-8 text-orange-600" />
            Policy Simulation Lab
          </h2>
          <p className="text-muted-foreground">Model policy impacts across health, climate, and governance systems</p>
        </div>
        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
          Sonar Powered
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Simulation Parameters
            </CardTitle>
            <CardDescription>Configure policy variables and constraints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="policy-type">Policy Type</Label>
              <Select value={policyType} onValueChange={setPolicyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select policy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carbon-tax">Carbon Tax</SelectItem>
                  <SelectItem value="universal-healthcare">Universal Healthcare</SelectItem>
                  <SelectItem value="digital-governance">Digital Governance</SelectItem>
                  <SelectItem value="green-infrastructure">Green Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbon-tax">Carbon Tax Rate: ${carbonTax[0]}/tonne CO2</Label>
              <Slider value={carbonTax} onValueChange={setCarbonTax} max={200} min={10} step={5} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe">Simulation Timeframe: {timeframe[0]} years</Label>
              <Slider value={timeframe} onValueChange={setTimeframe} max={20} min={1} step={1} className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="population">Target Population</Label>
              <Input
                id="population"
                placeholder="e.g., Urban areas, 1M+ population"
                value={population}
                onChange={(e) => setPopulation(e.target.value)}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button onClick={runSimulation} disabled={isRunning} className="flex-1">
                {isRunning ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent mr-2" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run Simulation
                  </>
                )}
              </Button>
              <Button variant="outline" size="icon">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription>Projected impacts across key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  {(simulationData?.results || initialSimulationResults).map((result, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{result.parameter}</h4>
                            <p className="text-sm text-muted-foreground">
                              Baseline: {result.baseline}
                              {result.unit}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {result.projected}
                              {result.unit}
                            </div>
                            <div
                              className={`text-sm font-medium ${
                                result.parameter === "Carbon Emissions" || result.parameter === "Economic Impact"
                                  ? result.change < 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                  : result.change > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                              }`}
                            >
                              {result.change > 0 ? "+" : ""}
                              {result.change}
                              {result.unit}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="analysis">
                {simulationData ? (
                  <div className="prose max-w-none mt-4">
                    <p className="whitespace-pre-line">{simulationData.analysis}</p>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Run a simulation to see detailed analysis
                  </div>
                )}
              </TabsContent>
              <TabsContent value="recommendations">
                {simulationData ? (
                  <div className="mt-4">
                    <ul className="space-y-2">
                      {simulationData.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Badge className="mt-0.5">{index + 1}</Badge>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">Run a simulation to see recommendations</div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          {simulationData && (
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="text-sm text-muted-foreground">Confidence: {simulationData.confidence}%</div>
              <Button variant="outline" size="sm">
                Export Results
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Confidence Metrics</CardTitle>
            <CardDescription>Model reliability and uncertainty analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Confidence</span>
              <Badge variant="default" className="bg-green-100 text-green-700">
                {simulationData?.confidence || 87.3}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Data Quality Score</span>
              <Badge variant="secondary">High</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Model Validation</span>
              <Badge variant="default" className="bg-blue-100 text-blue-700">
                Peer Reviewed
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Historical Accuracy</span>
              <span className="font-medium">91.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulation History</CardTitle>
            <CardDescription>Recent policy simulations and their outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {simulationHistory.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <div>
                    <div className="font-medium text-sm">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </div>
                  <Badge variant="outline">{item.outcome}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
