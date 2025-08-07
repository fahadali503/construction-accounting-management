import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { projectId } = await params

        const financialRecords = await prisma.financialRecord.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                date: 'desc'
            }
        })

        return NextResponse.json(financialRecords)
    } catch (error) {
        console.error('Error fetching financial records:', error)
        return NextResponse.json(
            { error: 'Failed to fetch financial records' },
            { status: 500 }
        )
    }
}
