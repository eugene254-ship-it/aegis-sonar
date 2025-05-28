"use client"

import { OverviewDashboard } from "@/components/views/overview-dashboard"
import { PublicHealthDashboard } from "@/components/views/public-health-dashboard"
import { GovernanceDashboard } from "@/components/views/governance-dashboard"
import { ClimateDashboard } from "@/components/views/climate-dashboard"
import { AIReasoningDashboard } from "@/components/views/ai-reasoning-dashboard"
import { PolicySimulationDashboard } from "@/components/views/policy-simulation-dashboard"
import { SearchDashboard } from "@/components/views/search-dashboard"
import { SettingsDashboard } from "@/components/views/settings-dashboard"

interface DashboardContentProps {
  activeView: string
}

export function DashboardContent({ activeView }: DashboardContentProps) {
  const renderView = () => {
    switch (activeView) {
      case "overview":
        return <OverviewDashboard />
      case "public-health":
        return <PublicHealthDashboard />
      case "governance":
        return <GovernanceDashboard />
      case "climate":
        return <ClimateDashboard />
      case "ai-reasoning":
        return <AIReasoningDashboard />
      case "policy-sim":
        return <PolicySimulationDashboard />
      case "search":
        return <SearchDashboard />
      case "settings":
        return <SettingsDashboard />
      default:
        return <OverviewDashboard />
    }
  }

  return <main className="flex-1 overflow-auto p-4 md:p-6">{renderView()}</main>
}
