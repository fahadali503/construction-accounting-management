'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  FolderOpen,
  Building,
  Users,
  Package,
  DollarSign,
  FileText,
  Receipt,
  BarChart3,
  FileSearch,
  Settings,
  HelpCircle,
  Zap
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, current: true },
  { name: 'Projects', icon: FolderOpen, current: false },
  { name: 'Construction', icon: Building, current: false },
  { name: 'Vendors/Contractors', icon: Users, current: false },
  { name: 'Customers', icon: Package, current: false },
  { name: 'Payables', icon: DollarSign, current: false },
  { name: 'Receivables', icon: Receipt, current: false },
  { name: 'Costs', icon: BarChart3, current: false },
  { name: 'Team', icon: Users, current: false },
  { name: 'Documents', icon: FileText, current: false },
  { name: 'Analytics', icon: BarChart3, current: false },
  { name: 'Reports', icon: FileSearch, current: false },
]

export function LeftSidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <Zap className="h-5 w-5" />
          </div>
          <span className="font-semibold">BuildFlow</span>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-400 bg-blue-400/10">
          <span className="text-xs">Quick Create</span>
        </Button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Button
              key={item.name}
              variant={item.current ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                item.current
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              <Icon className="mr-3 h-4 w-4" />
              {item.name}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <Settings className="mr-3 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700">
            <HelpCircle className="mr-3 h-4 w-4" />
            Help
          </Button>
        </div>
      </div>
    </div>
  )
}
