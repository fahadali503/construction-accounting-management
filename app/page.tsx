'use client'

import { useState } from 'react'
import { DashboardView } from '@/components/dashboard/DashboardView'
import { ReportsView } from '@/components/reports/ReportsView'
import { ProjectFinancialView } from '@/components/project/ProjectFinancialView'
import { PasswordProtection } from '@/components/auth/PasswordProtection'

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'reports' | 'project'>('dashboard')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const handleViewReport = (projectId: string) => {
    setSelectedProjectId(projectId)
    setCurrentView('reports')
  }

  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId)
    setCurrentView('project')
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedProjectId(null)
  }

  return (
    <PasswordProtection>
      <div className="min-h-screen bg-gray-50">
        {currentView === 'dashboard' ? (
          <DashboardView
            onViewReport={handleViewReport}
            onViewProject={handleViewProject}
          />
        ) : currentView === 'reports' ? (
          <ReportsView
            projectId={selectedProjectId!}
            onBack={handleBackToDashboard}
          />
        ) : (
          <ProjectFinancialView
            projectId={selectedProjectId!}
            onBack={handleBackToDashboard}
          />
        )}
      </div>
    </PasswordProtection>
  )
}
