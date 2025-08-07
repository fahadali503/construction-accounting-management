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

        const financialRecords = await prisma.financialRecord.findMany({
            where: {
                projectId: projectId
            },
            orderBy: {
                date: 'desc'
            }
        })

        console.log('Found financial records:', financialRecords.length)
        return NextResponse.json(financialRecords)
    } catch (error) {
        console.error('Error fetching financial records:', error)
        return NextResponse.json(
            { error: 'Failed to fetch financial records', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}
