"use client"

import { Leaf, Thermometer, Droplets, Wind, Sun, AlertTriangle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const climateMetrics = [
  { title: "Carbon Emissions", value: "-12.3%", change: "vs last year", icon: Leaf, color: "text-green-600" },
  { title: "Temperature Anomaly", value: "+1.8°C", change: "above baseline", icon: Thermometer, color: "text-red-600" },
  { title: "Renewable Energy", value: "67.2%", change: "+8.4% growth", icon: Sun, color: "text-yellow-600" },
  { title: "Air Quality Index", value: "Good", change: "42 AQI", icon: Wind, color: "text-blue-600" },
]

const riskAssessments = [
  { risk: "Heat Wave", probability: 78, impact: "High", timeframe: "Next 30 days" },
  { risk: "Flooding", probability: 34, impact: "Medium", timeframe: "Next 90 days" },
  { risk: "Drought", probability: 12, impact: "Low", timeframe: "Next 6 months" },
  { risk: "Storm Events", probability: 45, impact: "High", timeframe: "Next 60 days" },
]

export function ClimateDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            Climate Resilience Monitor
          </h2>
          <p className="text-muted-foreground">Environmental monitoring, adaptation strategies, and risk assessment</p>
        </div>
        <Badge variant="destructive" className="animate-pulse">
          3 Climate Risks
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {climateMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.change}</p>
                </div>
                <metric.icon className={`h-8 w-8 ${metric.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Climate Risk Assessment</CardTitle>
            <CardDescription>Predictive analysis of climate-related risks and their probability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAssessments.map((risk, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{risk.risk}</h4>
                      <p className="text-xs text-muted-foreground">{risk.timeframe}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          risk.impact === "High" ? "destructive" : risk.impact === "Medium" ? "default" : "secondary"
                        }
                      >
                        {risk.impact} Impact
                      </Badge>
                      <span className="text-sm font-medium">{risk.probability}%</span>
                    </div>
                  </div>
                  <Progress value={risk.probability} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Active Alerts
            </CardTitle>
            <CardDescription>Real-time environmental monitoring alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-red-200 bg-red-50">
                <div className="h-2 w-2 rounded-full bg-red-500 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Heat Wave Warning</p>
                  <p className="text-xs text-muted-foreground">Temperature expected to exceed 38°C</p>
                  <p className="text-xs text-muted-foreground">Next 3 days</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-yellow-200 bg-yellow-50">
                <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Air Quality Alert</p>
                  <p className="text-xs text-muted-foreground">PM2.5 levels elevated in urban areas</p>
                  <p className="text-xs text-muted-foreground">Current</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div className="h-2 w-2 rounded-full bg-orange-500 mt-2" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Drought Watch</p>
                  <p className="text-xs text-muted-foreground">Soil moisture below normal levels</p>
                  <p className="text-xs text-muted-foreground">Regional</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              Water Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Reservoir Levels</span>
                <span className="font-medium">73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Groundwater</span>
                <span className="font-medium">61%</span>
              </div>
              <Progress value={61} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water Quality</span>
                <span className="font-medium">89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5" />
              Energy Transition
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">67.2%</div>
              <div className="text-xs text-muted-foreground">Renewable Energy Share</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">-23.4%</div>
              <div className="text-xs text-muted-foreground">Carbon Intensity Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">142 MW</div>
              <div className="text-xs text-muted-foreground">New Capacity This Year</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Adaptation Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Green Infrastructure</span>
              <Badge variant="default">78% complete</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Early Warning Systems</span>
              <Badge variant="default">92% coverage</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Climate Education</span>
              <Badge variant="secondary">65% participation</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Emergency Preparedness</span>
              <Badge variant="default">84% ready</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
