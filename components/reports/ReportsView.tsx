'use client'

import { useState, useMemo } from 'react'
import { useTransactions } from '@/hooks/use-transactions'
import { useProjects } from '@/hooks/use-projects'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Download, Filter } from 'lucide-react'
import { TransactionsTable } from './TransactionsTable'
import { ReportSummary } from './ReportSummary'
import { format } from 'date-fns'

interface ReportsViewProps {
  projectId: string
  onBack: () => void
}

export function ReportsView({ projectId, onBack }: ReportsViewProps) {
  const { data: transactions, isLoading: transactionsLoading } = useTransactions(projectId)
  const { data: projects } = useProjects()
  const [dateFilter, setDateFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const project = projects?.find(p => p.id === projectId)

  const filteredTransactions = useMemo(() => {
    if (!transactions) return []

    let filtered = [...transactions]

    if (dateFilter) {
      filtered = filtered.filter(transaction =>
        format(new Date(transaction.date), 'yyyy-MM-dd') === dateFilter
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(transaction =>
        transaction.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [transactions, dateFilter, categoryFilter])

  const categories = useMemo(() => {
    if (!transactions) return []
    const uniqueCategories = [...new Set(transactions.map(t => t.category))]
    return uniqueCategories.sort()
  }, [transactions])

  const summary = useMemo(() => {
    if (!filteredTransactions.length) {
      return { totalCredit: 0, totalDebit: 0, totalBalance: 0, entryCount: 0 }
    }

    const totalCredit = filteredTransactions.reduce((sum, t) => sum + t.credit, 0)
    const totalDebit = filteredTransactions.reduce((sum, t) => sum + t.debit, 0)
    const totalBalance = totalCredit - totalDebit

    return {
      totalCredit,
      totalDebit,
      totalBalance,
      entryCount: filteredTransactions.length
    }
  }, [filteredTransactions])

  if (transactionsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading report...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm mb-2">
            <span>Account Manager Report</span>
            <span>•</span>
            <span>{format(new Date(), 'dd MMMM yyyy, HH:mm a')}</span>
            <span>•</span>
            <span className="text-blue-200">Generated using Account Manager</span>
          </div>

          <h1 className="text-2xl font-bold">
            {project?.name || 'Project Report'}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <ReportSummary summary={summary} />

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Date:</label>
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-40"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Category:</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(dateFilter || categoryFilter !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setDateFilter('')
                  setCategoryFilter('all')
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        <TransactionsTable transactions={filteredTransactions} />
      </div>
    </div>
  )
}
