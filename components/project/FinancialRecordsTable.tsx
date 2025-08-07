'use client'

import { useState, useMemo } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FinancialRecord } from '@/lib/types'
import { MoreHorizontal, Edit, Trash2, Receipt, Filter, X, ChevronDown } from 'lucide-react'
import { format } from 'date-fns'

interface FinancialRecordsTableProps {
    records: FinancialRecord[]
    onEditRecord: (recordId: string) => void
}

interface Filters {
    dateFrom: string
    dateTo: string
    description: string
    category: string
    trade: string
    unit: string
    unitRatePriceMin: string
    unitRatePriceMax: string
    qtyMin: string
    qtyMax: string
    totalAmountMin: string
    totalAmountMax: string
}

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'Contractor':
            return 'bg-blue-100 text-blue-800'
        case 'Vendor':
            return 'bg-green-100 text-green-800'
        case 'Supplier':
            return 'bg-orange-100 text-orange-800'
        default:
            return 'bg-gray-100 text-gray-800'
    }
}

export function FinancialRecordsTable({ records, onEditRecord }: FinancialRecordsTableProps) {
    const [filters, setFilters] = useState<Filters>({
        dateFrom: '',
        dateTo: '',
        description: '',
        category: '',
        trade: '',
        unit: '',
        unitRatePriceMin: '',
        unitRatePriceMax: '',
        qtyMin: '',
        qtyMax: '',
        totalAmountMin: '',
        totalAmountMax: '',
    })

    // Get unique values for dropdown filters
    const uniqueCategories = useMemo(() =>
        [...new Set(records.map(r => r.category))].sort(), [records])
    const uniqueTrades = useMemo(() =>
        [...new Set(records.map(r => r.trade))].sort(), [records])
    const uniqueUnits = useMemo(() =>
        [...new Set(records.map(r => r.unit))].sort(), [records])

    // Filter records based on current filters
    const filteredRecords = useMemo(() => {
        return records.filter(record => {
            // Date filters
            if (filters.dateFrom && new Date(record.date) < new Date(filters.dateFrom)) return false
            if (filters.dateTo && new Date(record.date) > new Date(filters.dateTo)) return false

            // Text filters
            if (filters.description && !record.description.toLowerCase().includes(filters.description.toLowerCase())) return false
            if (filters.category && record.category !== filters.category) return false
            if (filters.trade && !record.trade.toLowerCase().includes(filters.trade.toLowerCase())) return false
            if (filters.unit && !record.unit.toLowerCase().includes(filters.unit.toLowerCase())) return false

            // Number range filters
            if (filters.unitRatePriceMin && record.unitRatePrice < parseFloat(filters.unitRatePriceMin)) return false
            if (filters.unitRatePriceMax && record.unitRatePrice > parseFloat(filters.unitRatePriceMax)) return false
            if (filters.qtyMin && record.qty < parseFloat(filters.qtyMin)) return false
            if (filters.qtyMax && record.qty > parseFloat(filters.qtyMax)) return false
            if (filters.totalAmountMin && record.totalAmount < parseFloat(filters.totalAmountMin)) return false
            if (filters.totalAmountMax && record.totalAmount > parseFloat(filters.totalAmountMax)) return false

            return true
        })
    }, [records, filters])

    const updateFilter = (key: keyof Filters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const clearFilters = () => {
        setFilters({
            dateFrom: '',
            dateTo: '',
            description: '',
            category: '',
            trade: '',
            unit: '',
            unitRatePriceMin: '',
            unitRatePriceMax: '',
            qtyMin: '',
            qtyMax: '',
            totalAmountMin: '',
            totalAmountMax: '',
        })
    }

    const hasActiveFilters = Object.values(filters).some(value => value !== '')

    if (records.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="text-gray-400 mb-4">
                    <Receipt className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No financial records found</h3>
                <p className="text-gray-600 mb-4">Add your first financial record to start tracking expenses</p>
            </div>
        )
    }

    const totalAmount = filteredRecords.reduce((sum, record) => sum + record.totalAmount, 0)
    const totalCredit = filteredRecords.reduce((sum, record) => sum + (record.totalAmount > 0 ? record.totalAmount : 0), 0)
    const totalDebit = filteredRecords.reduce((sum, record) => sum + (record.totalAmount < 0 ? Math.abs(record.totalAmount) : 0), 0)
    const totalBalance = totalCredit - totalDebit

    return (
        <div>
            {/* Summary */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Financial Records Summary</h2>
                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Filter className="h-3 w-3" />
                                {Object.values(filters).filter(v => v !== '').length} filters active
                            </Badge>
                        )}
                        <div className="text-sm text-gray-600">
                            Showing {filteredRecords.length} of {records.length} records
                        </div>
                        {hasActiveFilters && (
                            <Button variant="outline" size="sm" onClick={clearFilters}>
                                <X className="h-3 w-3 mr-1" />
                                Clear All Filters
                            </Button>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Total Records</h3>
                        <p className="text-2xl font-bold text-gray-900">{filteredRecords.length}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Total Amount</h3>
                        <p className="text-2xl font-bold text-gray-900">Rs{totalAmount.toLocaleString()}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Total Credit</h3>
                        <p className="text-2xl font-bold text-green-600">Rs{totalCredit.toLocaleString()}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Total Debit</h3>
                        <p className="text-2xl font-bold text-red-600">Rs{totalDebit.toLocaleString()}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-700">Total Balance</h3>
                        <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Rs{totalBalance.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>



            {/* Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <div className="flex items-center justify-between">
                                    <span>Date</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${(filters.dateFrom || filters.dateTo) ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Date</h4>
                                                <div className="space-y-2">
                                                    <div>
                                                        <Label htmlFor="dateFrom" className="text-xs">From</Label>
                                                        <Input
                                                            id="dateFrom"
                                                            type="date"
                                                            value={filters.dateFrom}
                                                            onChange={(e) => updateFilter('dateFrom', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="dateTo" className="text-xs">To</Label>
                                                        <Input
                                                            id="dateTo"
                                                            type="date"
                                                            value={filters.dateTo}
                                                            onChange={(e) => updateFilter('dateTo', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                                {(filters.dateFrom || filters.dateTo) && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            updateFilter('dateFrom', '')
                                                            updateFilter('dateTo', '')
                                                        }}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center justify-between">
                                    <span>Description</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${filters.description ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Description</h4>
                                                <Input
                                                    placeholder="Search description..."
                                                    value={filters.description}
                                                    onChange={(e) => updateFilter('description', e.target.value)}
                                                    className="h-8"
                                                />
                                                {filters.description && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateFilter('description', '')}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center justify-between">
                                    <span>Category</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${filters.category ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Category</h4>
                                                <Select value={filters.category} onValueChange={(value) => updateFilter('category', value === 'all' ? '' : value)}>
                                                    <SelectTrigger className="h-8">
                                                        <SelectValue placeholder="All categories" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="all">All categories</SelectItem>
                                                        {uniqueCategories.map(category => (
                                                            <SelectItem key={category} value={category}>
                                                                {category}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {filters.category && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateFilter('category', '')}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center justify-between">
                                    <span>Trade</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${filters.trade ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Trade</h4>
                                                <Input
                                                    placeholder="Search trade..."
                                                    value={filters.trade}
                                                    onChange={(e) => updateFilter('trade', e.target.value)}
                                                    className="h-8"
                                                />
                                                {filters.trade && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateFilter('trade', '')}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead>
                                <div className="flex items-center justify-between">
                                    <span>Unit</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${filters.unit ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Unit</h4>
                                                <Input
                                                    placeholder="Search unit..."
                                                    value={filters.unit}
                                                    onChange={(e) => updateFilter('unit', e.target.value)}
                                                    className="h-8"
                                                />
                                                {filters.unit && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateFilter('unit', '')}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead className="text-right">
                                <div className="flex items-center justify-between">
                                    <span>Unit Rate</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${(filters.unitRatePriceMin || filters.unitRatePriceMax) ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Unit Rate</h4>
                                                <div className="space-y-2">
                                                    <div>
                                                        <Label htmlFor="unitRateMin" className="text-xs">Minimum</Label>
                                                        <Input
                                                            id="unitRateMin"
                                                            type="number"
                                                            placeholder="0"
                                                            value={filters.unitRatePriceMin}
                                                            onChange={(e) => updateFilter('unitRatePriceMin', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="unitRateMax" className="text-xs">Maximum</Label>
                                                        <Input
                                                            id="unitRateMax"
                                                            type="number"
                                                            placeholder="999999"
                                                            value={filters.unitRatePriceMax}
                                                            onChange={(e) => updateFilter('unitRatePriceMax', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                                {(filters.unitRatePriceMin || filters.unitRatePriceMax) && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            updateFilter('unitRatePriceMin', '')
                                                            updateFilter('unitRatePriceMax', '')
                                                        }}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead className="text-right">
                                <div className="flex items-center justify-between">
                                    <span>Qty</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${(filters.qtyMin || filters.qtyMax) ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Quantity</h4>
                                                <div className="space-y-2">
                                                    <div>
                                                        <Label htmlFor="qtyMin" className="text-xs">Minimum</Label>
                                                        <Input
                                                            id="qtyMin"
                                                            type="number"
                                                            placeholder="0"
                                                            value={filters.qtyMin}
                                                            onChange={(e) => updateFilter('qtyMin', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="qtyMax" className="text-xs">Maximum</Label>
                                                        <Input
                                                            id="qtyMax"
                                                            type="number"
                                                            placeholder="999999"
                                                            value={filters.qtyMax}
                                                            onChange={(e) => updateFilter('qtyMax', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                                {(filters.qtyMin || filters.qtyMax) && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            updateFilter('qtyMin', '')
                                                            updateFilter('qtyMax', '')
                                                        }}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead className="text-right">
                                <div className="flex items-center justify-between">
                                    <span>Total Amount</span>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                                <Filter className={`h-3 w-3 ${(filters.totalAmountMin || filters.totalAmountMax) ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64" align="start">
                                            <div className="space-y-3">
                                                <h4 className="font-medium text-sm">Filter by Total Amount</h4>
                                                <div className="space-y-2">
                                                    <div>
                                                        <Label htmlFor="amountMin" className="text-xs">Minimum</Label>
                                                        <Input
                                                            id="amountMin"
                                                            type="number"
                                                            placeholder="0"
                                                            value={filters.totalAmountMin}
                                                            onChange={(e) => updateFilter('totalAmountMin', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="amountMax" className="text-xs">Maximum</Label>
                                                        <Input
                                                            id="amountMax"
                                                            type="number"
                                                            placeholder="999999"
                                                            value={filters.totalAmountMax}
                                                            onChange={(e) => updateFilter('totalAmountMax', e.target.value)}
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                                {(filters.totalAmountMin || filters.totalAmountMax) && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            updateFilter('totalAmountMin', '')
                                                            updateFilter('totalAmountMax', '')
                                                        }}
                                                        className="w-full h-8"
                                                    >
                                                        <X className="h-3 w-3 mr-1" />
                                                        Clear
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </TableHead>
                            <TableHead className="text-center">
                                <div className="flex items-center justify-center">
                                    <span>Actions</span>
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRecords.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>
                                    {format(new Date(record.date), 'MMM dd, yyyy')}
                                </TableCell>
                                <TableCell className="max-w-xs truncate">
                                    {record.description}
                                </TableCell>
                                <TableCell>
                                    <Badge className={getCategoryColor(record.category)}>
                                        {record.category}
                                    </Badge>
                                </TableCell>
                                <TableCell>{record.trade}</TableCell>
                                <TableCell>{record.unit}</TableCell>
                                <TableCell className="text-right">
                                    Rs{record.unitRatePrice.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {record.qty}
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    Rs{record.totalAmount.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onEditRecord(record.id)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
