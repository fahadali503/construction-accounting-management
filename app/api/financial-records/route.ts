import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            projectId,
            date,
            description,
            category,
            trade,
            unit,
            unitRatePrice,
            qty,
            totalAmount
        } = body

        const financialRecord = await (prisma as any).financialRecord.create({
            data: {
                projectId,
                date: new Date(date),
                description,
                category,
                trade,
                unit,
                unitRatePrice: parseFloat(unitRatePrice),
                qty: parseFloat(qty),
                totalAmount: parseFloat(totalAmount),
            },
        })

        return NextResponse.json(financialRecord)
    } catch (error) {
        console.error('Error creating financial record:', error)
        return NextResponse.json(
            { error: 'Failed to create financial record' },
            { status: 500 }
        )
    }
}
