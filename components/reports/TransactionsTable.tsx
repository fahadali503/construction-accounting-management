'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Transaction } from '@/lib/types'
import { format } from 'date-fns'

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <div className="text-gray-500 mb-2">No transactions found</div>
        <div className="text-sm text-gray-400">
          Try adjusting your filters or add some transactions to this project.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Notes</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold text-right">Credit</TableHead>
              <TableHead className="font-semibold text-right">Debit</TableHead>
              <TableHead className="font-semibold text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={transaction.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
              >
                <TableCell className="font-medium">
                  {format(new Date(transaction.date), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>{transaction.notes}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell className="text-right text-green-600 font-medium">
                  {transaction.credit > 0 ? `${transaction.credit.toLocaleString()}` : ''}
                </TableCell>
                <TableCell className="text-right text-red-600 font-medium">
                  {transaction.debit > 0 ? `${transaction.debit.toLocaleString()}` : ''}
                </TableCell>
                <TableCell className={`text-right font-medium ${transaction.balance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                  {transaction.balance.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
