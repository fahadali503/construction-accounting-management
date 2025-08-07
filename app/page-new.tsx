'use client'

import { useState } from 'react'
import { DashboardView } from '@/components/dashboard/DashboardView'
import { ReportsView } from '@/components/reports/ReportsView'

export default function HomePage() {
    const [currentView, setCurrentView] = useState<'dashboard' | 'reports'>('dashboard')
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

    const handleViewReport = (projectId: string) => {
        setSelectedProjectId(projectId)
        setCurrentView('reports')
    }

    const handleViewProject = (projectId: string) => {
        setSelectedProjectId(projectId)
        // For now, just log - this is the old page file
        console.log('View project:', projectId)
    }

    const handleBackToDashboard = () => {
        setCurrentView('dashboard')
        setSelectedProjectId(null)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {currentView === 'dashboard' ? (
                <DashboardView
                    onViewReport={handleViewReport}
                    onViewProject={handleViewProject}
                />
            ) : (
                <ReportsView
                    projectId={selectedProjectId!}
                    onBack={handleBackToDashboard}
                />
            )}
        </div>
    )
}
