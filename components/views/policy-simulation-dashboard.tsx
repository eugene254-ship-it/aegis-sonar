"use client"

import { useState } from "react"
import { Play, RotateCcw, Settings, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SimulationResult {
  parameter: string
  baseline: number
  projected: number
  change: number
  unit: string
}

const simulationResults: SimulationResult[] = [
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

  const runSimulation = () => {
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 3000)
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
          Experimental
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
                defaultValue="Metropolitan areas"
              />
            </div>

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
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  {simulationResults.map((result, index) => (
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
                              className={`text-sm font-medium ${result.change > 0 ? "text-green-600" : "text-red-600"}`}
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
              <TabsContent value="timeline">
                <div className="text-center py-8 text-muted-foreground">
                  Timeline visualization will appear here after simulation
                </div>
              </TabsContent>
              <TabsContent value="scenarios">
                <div className="text-center py-8 text-muted-foreground">Scenario comparisons will appear here</div>
              </TabsContent>
            </Tabs>
          </CardContent>
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
                87.3%
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
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted">
                <div>
                  <div className="font-medium text-sm">Carbon Tax $75/tonne</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
                <Badge variant="outline">-18% emissions</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted">
                <div>
                  <div className="font-medium text-sm">Universal Healthcare</div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
                <Badge variant="outline">+12% health score</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted">
                <div>
                  <div className="font-medium text-sm">Digital ID System</div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
                <Badge variant="outline">+25% efficiency</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
