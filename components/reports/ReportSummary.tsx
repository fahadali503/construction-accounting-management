'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProjectSummary } from '@/lib/types'

interface ReportSummaryProps {
  summary: ProjectSummary
}

export function ReportSummary({ summary }: ReportSummaryProps) {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Rs {summary.totalCredit.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Debit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              Rs {summary.totalDebit.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${summary.totalBalance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
              Rs {summary.totalBalance.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {summary.entryCount}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
