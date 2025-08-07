import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        console.log('Financial records API called')
        const { projectId } = await params
        console.log('Project ID:', projectId)

        const financialRecords = await prisma.financialRecord.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                date: 'desc'
            }
        })

        console.log('Found records:', financialRecords.length)
        return NextResponse.json(financialRecords)
    } catch (error) {
        console.error('Error fetching financial records:', error)
        return NextResponse.json(
            { error: 'Failed to fetch financial records' },
            { status: 500 }
        )
    }
}
