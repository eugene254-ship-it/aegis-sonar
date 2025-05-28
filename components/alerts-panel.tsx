"use client"

import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const alerts = [
  { type: "warning", title: "High CPU Usage", message: "System performance degraded", time: "5 min ago" },
  { type: "success", title: "Backup Completed", message: "Data backup successful", time: "1 hour ago" },
  { type: "info", title: "New Policy Update", message: "Climate policy revision available", time: "2 hours ago" },
]

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          System Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start gap-3">
              {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500 mt-1" />}
              {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500 mt-1" />}
              {alert.type === "info" && <Info className="h-4 w-4 text-blue-500 mt-1" />}
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.title}</p>
                <p className="text-xs text-muted-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {alert.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
