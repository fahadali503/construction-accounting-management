'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Lock, Building } from 'lucide-react'

interface PasswordProtectionProps {
    children: React.ReactNode
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // Check if user is already authenticated on mount
    useEffect(() => {
        const authStatus = sessionStorage.getItem('isAuthenticated')
        if (authStatus === 'true') {
            setIsAuthenticated(true)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            // Client-side password verification
            const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || 'admin123'

            if (password === correctPassword) {
                setIsAuthenticated(true)
                sessionStorage.setItem('isAuthenticated', 'true')
                setPassword('')
            } else {
                setError('Invalid password')
                setPassword('')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
            setPassword('')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        sessionStorage.removeItem('isAuthenticated')
        setPassword('')
        setError('')
    }

    // If authenticated, render the children (main app)
    if (isAuthenticated) {
        return (
            <div>
                {/* Logout button in top-right corner */}
                <div className="fixed top-4 right-4 z-50">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="bg-white shadow-md"
                    >
                        <Lock className="w-4 h-4 mr-2" />
                        Logout
                    </Button>
                </div>
                {children}
            </div>
        )
    }

    // Render password protection screen
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <Building className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                            Hittah Engineers & Contractors
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-2">
                            Construction Management Platform
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Access Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="pr-10"
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-400" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={!password.trim() || isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Verifying...
                                </div>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4 mr-2" />
                                    Access Dashboard
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Secure access to construction management tools
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
