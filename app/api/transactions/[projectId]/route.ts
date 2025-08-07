import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    console.log('Transactions API called')
    const { projectId } = await params
    console.log('Project ID:', projectId)

    // First check if the project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      console.log('Project not found:', projectId)
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        projectId: projectId
      },
      orderBy: {
        date: 'desc'
      }
    })

    console.log('Found transactions:', transactions.length)
    return NextResponse.json(transactions)
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params
    const body = await request.json()
    const { date, notes, category, credit, debit } = body

    // Calculate balance (this is a simplified calculation)
    const balance = credit - debit

    const transaction = await prisma.transaction.create({
      data: {
        date: new Date(date),
        notes,
        category,
        credit,
        debit,
        balance,
        projectId,
      },
    })

    return NextResponse.json(transaction)
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    )
  }
}
