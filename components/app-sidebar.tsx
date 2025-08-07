"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconFileText,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconBuilding,
  IconCalculator,
  IconShield,
  IconMapPin,
  IconUser,
  IconUsersGroup,
  IconCurrencyDollar,
  IconReceipt,
  IconHammer,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: IconBuilding,
    },
    {
      title: "Construction",
      url: "/construction",
      icon: IconHammer,
    },
    {
      title: "Vendors/Contractors",
      url: "/vendors",
      icon: IconUser,
    },
    {
      title: "Customers",
      url: "/customers",
      icon: IconUsersGroup,
    },
    {
      title: "Payables",
      url: "/payables",
      icon: IconCurrencyDollar,
    },
    {
      title: "Receivables",
      url: "/receivables",
      icon: IconReceipt,
    },
    {
      title: "Costs",
      url: "/costs",
      icon: IconCalculator,
    },
    {
      title: "Team",
      url: "/team",
      icon: IconUsers,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: IconFileText,
    },
  ],
  navClouds: [
    {
      title: "Project Management",
      icon: IconShield,
      isActive: true,
      url: "/projects",
      items: [
        {
          title: "Active Projects",
          url: "/projects/active",
        },
        {
          title: "Completed Projects",
          url: "/projects/completed",
        },
        {
          title: "Project Planning",
          url: "/projects/planning",
        },
      ],
    },
    {
      title: "Site Monitoring",
      icon: IconMapPin,
      url: "/site-monitoring",
      items: [
        {
          title: "Progress Tracking",
          url: "/site/progress",
        },
        {
          title: "Safety Compliance",
          url: "/site/safety",
        },
        {
          title: "Quality Control",
          url: "/site/quality",
        },
      ],
    },
    {
      title: "Resource Planning",
      icon: IconCalculator,
      url: "/resources",
      items: [
        {
          title: "Equipment",
          url: "/resources/equipment",
        },
        {
          title: "Materials",
          url: "/resources/materials",
        },
        {
          title: "Labor",
          url: "/resources/labor",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: IconReport,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Blueprints",
      url: "/documents/blueprints",
      icon: IconFileText,
    },
    {
      name: "Permits",
      url: "/documents/permits",
      icon: IconFileText,
    },
    {
      name: "Contracts",
      url: "/documents/contracts",
      icon: IconFileText,
    },
    {
      name: "Reports",
      url: "/documents/reports",
      icon: IconReport,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src="/logo.png" alt="Hittah Engineers & Contractors" className="!size-8" />
                <span className="text-base font-semibold">Hittah Engineers & Contractors</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
    </Sidebar>
  )
}
