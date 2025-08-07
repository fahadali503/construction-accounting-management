import { BASE_API } from "./base";

export interface PasswordVerifyRequest {
    password: string;
}

export interface PasswordVerifyResponse {
    message: string;
}

export const authApi = {
    // Client-side password verification for the construction management app
    verifyPassword: async (data: PasswordVerifyRequest): Promise<PasswordVerifyResponse> => {
        // Client-side verification without API call
        const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || 'admin123'

        if (data.password === correctPassword) {
            return { message: 'Authentication successful' }
        } else {
            throw new Error('Invalid password')
        }
    },

    // Store authentication state locally
    setAuthenticated: (isAuthenticated: boolean): void => {
        localStorage.setItem("authenticated", isAuthenticated.toString());
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return localStorage.getItem("authenticated") === "true";
    },

    // Sign out - clear local authentication
    signOut: (): void => {
        localStorage.removeItem("authenticated");
    },
};
