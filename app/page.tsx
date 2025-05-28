"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardContent } from "@/components/dashboard-content"
import { SidebarInset } from "@/components/ui/sidebar"

export default function Home() {
  const [activeView, setActiveView] = useState("overview")

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar activeView={activeView} setActiveView={setActiveView} />
      <SidebarInset>
        <DashboardHeader />
        <DashboardContent activeView={activeView} />
      </SidebarInset>
    </SidebarProvider>
  )
}
