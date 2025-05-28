"use client"

import { Activity, AlertTriangle, Heart, Shield, TrendingDown, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const healthMetrics = [
  { title: "Population Health Index", value: "87.3", change: "+2.1%", trend: "up", color: "text-green-600" },
  { title: "Disease Prevention Rate", value: "92.8%", change: "+1.5%", trend: "up", color: "text-blue-600" },
  { title: "Healthcare Access", value: "78.4%", change: "-0.3%", trend: "down", color: "text-orange-600" },
  { title: "Emergency Response", value: "4.2 min", change: "-0.8 min", trend: "up", color: "text-purple-600" },
]

const alerts = [
  { title: "Flu Season Alert", severity: "medium", location: "Metropolitan Area", time: "2 hours ago" },
  { title: "Water Quality Issue", severity: "high", location: "District 7", time: "4 hours ago" },
  { title: "Air Quality Warning", severity: "low", location: "Industrial Zone", time: "1 day ago" },
]

export function PublicHealthDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-600" />
            Public Health Monitor
          </h2>
          <p className="text-muted-foreground">
            Real-time population health surveillance and intervention optimization
          </p>
        </div>
        <Badge variant="destructive" className="animate-pulse">
          1 Active Alert
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={`flex items-center text-sm font-medium ${metric.color}`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Health System Performance</CardTitle>
            <CardDescription>Key performance indicators across health infrastructure</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
                <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hospital Capacity</span>
                    <span className="text-sm text-muted-foreground">78% utilized</span>
                  </div>
                  <Progress value={78} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Vaccination Coverage</span>
                    <span className="text-sm text-muted-foreground">94% population</span>
                  </div>
                  <Progress value={94} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Mental Health Support</span>
                    <span className="text-sm text-muted-foreground">67% access</span>
                  </div>
                  <Progress value={67} className="h-2" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Chronic Disease Management</span>
                    <span className="text-sm text-muted-foreground">85% enrolled</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </TabsContent>
              <TabsContent value="prevention">
                <div className="text-center py-8 text-muted-foreground">Prevention metrics will be displayed here</div>
              </TabsContent>
              <TabsContent value="treatment">
                <div className="text-center py-8 text-muted-foreground">Treatment analytics will be displayed here</div>
              </TabsContent>
              <TabsContent value="outcomes">
                <div className="text-center py-8 text-muted-foreground">
                  Health outcomes data will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Active Health Alerts
            </CardTitle>
            <CardDescription>Real-time health surveillance and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div
                    className={`h-2 w-2 rounded-full mt-2 ${
                      alert.severity === "high"
                        ? "bg-red-500"
                        : alert.severity === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.location}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "default" : "secondary"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Population Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Age 0-18</span>
              <span className="text-sm font-medium">22.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Age 19-64</span>
              <span className="text-sm font-medium">61.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Age 65+</span>
              <span className="text-sm font-medium">15.9%</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Population</span>
                <span className="text-sm font-bold">2.4M</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Disease Surveillance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Respiratory Infections</span>
              <Badge variant="outline">+12%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cardiovascular Events</span>
              <Badge variant="secondary">-3%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Mental Health Cases</span>
              <Badge variant="outline">+8%</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Chronic Conditions</span>
              <Badge variant="secondary">Stable</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Intervention Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">127</div>
              <div className="text-xs text-muted-foreground">Lives Saved (projected)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$2.3M</div>
              <div className="text-xs text-muted-foreground">Healthcare Costs Avoided</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">15.7%</div>
              <div className="text-xs text-muted-foreground">Improved Health Outcomes</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
