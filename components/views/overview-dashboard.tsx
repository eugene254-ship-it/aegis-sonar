"use client"

import { Activity, AlertTriangle, Brain, Users, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MetricCard } from "@/components/metric-card"
import { TrendChart } from "@/components/trend-chart"

const kpiData = [
  { title: "System Health", value: "98.2%", change: "+0.5%", icon: Activity, color: "text-green-600" },
  { title: "Active Policies", value: "247", change: "+12", icon: Users, color: "text-blue-600" },
  { title: "AI Confidence", value: "94.8%", change: "+2.1%", icon: Brain, color: "text-purple-600" },
  { title: "Response Time", value: "0.3s", change: "-0.1s", icon: Zap, color: "text-yellow-600" },
]

const recentInsights = [
  { title: "Climate Risk Assessment Complete", time: "2 minutes ago", severity: "high" },
  { title: "Health Policy Impact Analysis", time: "15 minutes ago", severity: "medium" },
  { title: "Governance Efficiency Report", time: "1 hour ago", severity: "low" },
]

export function OverviewDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Overview Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time intelligence across public health, governance, and climate systems
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Live Data
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <MetricCard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Performance Trends</CardTitle>
            <CardDescription>Real-time monitoring across all AEGIS subsystems</CardDescription>
          </CardHeader>
          <CardContent>
            <TrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Recent Insights
            </CardTitle>
            <CardDescription>Latest AI-generated insights and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`h-2 w-2 rounded-full mt-2 ${
                      insight.severity === "high"
                        ? "bg-red-500"
                        : insight.severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{insight.title}</p>
                    <p className="text-xs text-muted-foreground">{insight.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Public Health Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Overall Health Index</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Risk Mitigation</span>
                <span className="font-medium">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Governance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Policy Effectiveness</span>
                <span className="font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Citizen Engagement</span>
                <span className="font-medium">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Climate Resilience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Adaptation Score</span>
                <span className="font-medium">83%</span>
              </div>
              <Progress value={83} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Risk Preparedness</span>
                <span className="font-medium">76%</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
