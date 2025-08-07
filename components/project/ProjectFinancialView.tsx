'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks/use-projects'
import { useFinancialRecords } from '@/hooks'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus } from 'lucide-react'
import { FinancialRecordsTable } from '@/components/project/FinancialRecordsTable'
import { CreateFinancialRecordDialog } from '@/components/project/CreateFinancialRecordDialog'

interface ProjectFinancialViewProps {
    projectId: string
    onBack: () => void
}

export function ProjectFinancialView({ projectId, onBack }: ProjectFinancialViewProps) {
    const { data: projects } = useProjects()
    const { data: financialRecords, isLoading, refetch } = useFinancialRecords(projectId)
    const [showCreateDialog, setShowCreateDialog] = useState(false)

    const project = projects?.find(p => p.id === projectId)

    const handleCreateDialogChange = (open: boolean) => {
        setShowCreateDialog(open)
        // Refetch data when dialog closes
        if (!open) {
            console.log('Dialog closed, refetching financial records...')
            refetch()
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading financial records...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                onClick={onBack}
                                className="flex items-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Dashboard
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {project?.name || 'Project Financial Records'}
                                </h1>
                                <p className="text-gray-600">
                                    {project?.location && `${project.location} • `}
                                    Manage financial records and expenses
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowCreateDialog(true)}
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Financial Record
                        </Button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold">Financial Records</h2>
                        <p className="text-sm text-gray-600">
                            Track all expenses, contractors, vendors, and suppliers for this project
                        </p>
                    </div>

                    <FinancialRecordsTable
                        records={financialRecords || []}
                        onEditRecord={(recordId: string) => {
                            // TODO: Implement edit functionality
                            console.log('Edit record:', recordId)
                        }}
                    />
                </div>
            </div>

            <CreateFinancialRecordDialog
                open={showCreateDialog}
                onOpenChange={handleCreateDialogChange}
                projectId={projectId}
            />
        </div>
    )
}
