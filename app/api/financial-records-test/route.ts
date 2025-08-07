import { NextResponse } from 'next/server'

export async function GET() {
    return NextResponse.json({ 
        message: 'Financial records API is working',
        timestamp: new Date().toISOString(),
        route: '/api/financial-records-test',
        status: 'success'
    })
}

export async function POST() {
    return NextResponse.json({ 
        message: 'POST method working',
        timestamp: new Date().toISOString()
    })
}
