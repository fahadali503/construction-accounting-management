import { useState } from 'react';
import { authApi, PasswordVerifyRequest } from '@/api/auth.api';

export interface UseSignInReturn {
    signIn: (data: PasswordVerifyRequest) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export const useSignIn = (): UseSignInReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (data: PasswordVerifyRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            await authApi.verifyPassword(data);
            authApi.setAuthenticated(true);

            // Redirect to dashboard or main page
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signIn,
        isLoading,
        error
    };
};
