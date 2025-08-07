'use client'

import { useProjects } from '@/hooks/use-projects'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'
import { SummaryCards } from './SummaryCards'
import { ProjectsTable } from './ProjectsTable'
import { TopNavigation } from './TopNavigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { CreateProjectDialog } from './CreateProjectDialog'

interface DashboardViewProps {
  onViewReport: (projectId: string) => void
  onViewProject: (projectId: string) => void
}

export function DashboardView({ onViewReport, onViewProject }: DashboardViewProps) {
  const { data: projects, isLoading: projectsLoading } = useProjects()
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  if (projectsLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Construction Management</h1>
              <p className="text-gray-600">Track contractor work, material supplies, and project expenses</p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>

          <SummaryCards stats={stats} />

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Projects Overview</h2>
              <p className="text-sm text-gray-600">Financial summary of all construction projects</p>
            </div>

            <ProjectsTable projects={projects || []} onViewReport={onViewReport} onViewProject={onViewProject} />
          </div>
        </div>
      </main>

      <CreateProjectDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  )
}
