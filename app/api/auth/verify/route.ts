import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json()

        // Get the password from environment variables
        const correctPassword = process.env.APP_PASSWORD || 'admin123'

        if (!password) {
            return NextResponse.json(
                { message: 'Password is required' },
                { status: 400 }
            )
        }

        // Simple password verification
        if (password === correctPassword) {
            return NextResponse.json(
                { message: 'Authentication successful' },
                { status: 200 }
            )
        } else {
            return NextResponse.json(
                { message: 'Invalid password' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Password verification error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
