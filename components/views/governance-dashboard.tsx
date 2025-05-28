"use client"

import { Building2, FileText, Users, Vote, Scale, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const governanceMetrics = [
  { title: "Policy Effectiveness", value: "78.4%", change: "+3.2%", icon: FileText, color: "text-blue-600" },
  { title: "Citizen Engagement", value: "65.7%", change: "+1.8%", icon: Users, color: "text-green-600" },
  { title: "Transparency Score", value: "89.2%", change: "+0.5%", icon: Scale, color: "text-purple-600" },
  { title: "Service Delivery", value: "82.1%", change: "+2.1%", icon: CheckCircle, color: "text-orange-600" },
]

const activePolicies = [
  { title: "Digital Identity Initiative", status: "Implementation", progress: 67, priority: "High" },
  { title: "Climate Adaptation Plan", status: "Review", progress: 89, priority: "Critical" },
  { title: "Healthcare Reform", status: "Draft", progress: 34, priority: "Medium" },
  { title: "Economic Recovery Package", status: "Active", progress: 92, priority: "High" },
]

export function GovernanceDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            Governance Analytics
          </h2>
          <p className="text-muted-foreground">
            Policy effectiveness, citizen engagement, and institutional performance
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          247 Active Policies
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {governanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  <span className="text-sm font-medium text-green-600">{metric.change}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Policy Pipeline</CardTitle>
            <CardDescription>Active policies and their implementation status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePolicies.map((policy, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">{policy.title}</h4>
                      <p className="text-xs text-muted-foreground">{policy.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          policy.priority === "Critical"
                            ? "destructive"
                            : policy.priority === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {policy.priority}
                      </Badge>
                      <span className="text-sm font-medium">{policy.progress}%</span>
                    </div>
                  </div>
                  <Progress value={policy.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Democratic Participation
            </CardTitle>
            <CardDescription>Citizen engagement and feedback metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Voting Participation</span>
                <span className="font-medium">72.3%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Public Consultations</span>
                <span className="font-medium">58.7%</span>
              </div>
              <Progress value={59} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Digital Engagement</span>
                <span className="font-medium">81.2%</span>
              </div>
              <Progress value={81} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Policy Feedback</span>
                <span className="font-medium">45.6%</span>
              </div>
              <Progress value={46} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Institutional Performance</CardTitle>
            <CardDescription>Government efficiency and service delivery metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="efficiency" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
                <TabsTrigger value="quality">Quality</TabsTrigger>
                <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
              </TabsList>
              <TabsContent value="efficiency" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Processing Time</span>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      -23% faster
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Digital Services</span>
                    <span className="text-sm font-medium">94.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cost Per Service</span>
                    <Badge variant="default" className="bg-blue-100 text-blue-700">
                      -15% reduction
                    </Badge>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="quality">
                <div className="text-center py-8 text-muted-foreground">Quality metrics will be displayed here</div>
              </TabsContent>
              <TabsContent value="satisfaction">
                <div className="text-center py-8 text-muted-foreground">
                  Citizen satisfaction data will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Policy Impact Analysis</CardTitle>
            <CardDescription>Real-world outcomes of implemented policies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+12.4%</div>
              <div className="text-xs text-muted-foreground">Economic Growth Impact</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">-8.7%</div>
              <div className="text-xs text-muted-foreground">Administrative Burden</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">+23.1%</div>
              <div className="text-xs text-muted-foreground">Service Accessibility</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">89.3%</div>
              <div className="text-xs text-muted-foreground">Implementation Success Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
