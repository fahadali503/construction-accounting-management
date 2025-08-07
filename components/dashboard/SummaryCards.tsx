'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats } from '@/lib/types'
import { Building2, Users, Truck, DollarSign } from 'lucide-react'

interface SummaryCardsProps {
  stats?: DashboardStats
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Projects',
      value: stats?.totalProjects || 0,
      subtitle: 'Active construction projects',
      icon: Building2,
      color: 'text-blue-600'
    },
    {
      title: 'Contractors',
      value: stats?.totalContractors || 0,
      subtitle: 'Registered contractors',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Suppliers',
      value: stats?.totalSuppliers || 0,
      subtitle: 'Material suppliers',
      icon: Truck,
      color: 'text-purple-600'
    },
    {
      title: 'Total Spent',
      value: `Rs${(stats?.totalSpent || 0).toLocaleString()}`,
      subtitle: 'All-time expenses',
      icon: DollarSign,
      color: 'text-red-600'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.subtitle}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
