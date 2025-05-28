"use client"

import { Activity, Brain, Building2, Cloud, Leaf, Search, Settings, Shield, Target, TrendingUp } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const navigationItems = [
  { id: "overview", title: "Overview", icon: TrendingUp, badge: null },
  { id: "public-health", title: "Public Health", icon: Activity, badge: "Alert" },
  { id: "governance", title: "Governance", icon: Building2, badge: null },
  { id: "climate", title: "Climate Resilience", icon: Leaf, badge: "3" },
  { id: "ai-reasoning", title: "AI Reasoning", icon: Brain, badge: "Beta" },
  { id: "policy-sim", title: "Policy Simulation", icon: Target, badge: null },
  { id: "search", title: "Search & Citations", icon: Search, badge: null },
]

const systemItems = [
  { id: "security", title: "Security", icon: Shield },
  { id: "settings", title: "Settings", icon: Settings },
]

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Cloud className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">AEGIS Platform</span>
                <span className="truncate text-xs">Decision Intelligence</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => setActiveView(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant={item.badge === "Alert" ? "destructive" : "secondary"} className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => setActiveView(item.id)}
                    className="cursor-pointer"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span>Online • Synced</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
