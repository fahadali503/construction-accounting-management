import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const [projectCount, totalSpentResult] = await Promise.all([
      prisma.project.count(),
      prisma.project.aggregate({
        _sum: {
          totalCost: true
        }
      })
    ])

    // Get unique categories for contractors and suppliers
    const transactions = await prisma.transaction.findMany({
      select: {
        category: true
      },
      distinct: ['category']
    })

    // Simple categorization - in a real app you might have proper contractor/supplier tables
    const contractorCategories = transactions.filter((t: { category: string }) =>
      t.category.toLowerCase().includes('contractor') ||
      t.category.toLowerCase().includes('labour')
    ).length

    const supplierCategories = transactions.filter((t: { category: string }) =>
      t.category.toLowerCase().includes('material') ||
      t.category.toLowerCase().includes('freight')
    ).length

    const stats = {
      totalProjects: projectCount,
      totalContractors: contractorCategories,
      totalSuppliers: supplierCategories,
      totalSpent: totalSpentResult._sum.totalCost || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}
