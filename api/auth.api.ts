import { BASE_API } from "./base";

export interface PasswordVerifyRequest {
    password: string;
}

export interface PasswordVerifyResponse {
    message: string;
}

export const authApi = {
    // Simple password verification for the construction management app
    verifyPassword: async (data: PasswordVerifyRequest): Promise<PasswordVerifyResponse> => {
        const response = await BASE_API.post<PasswordVerifyResponse>("/api/auth/verify", data);
        return response.data;
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
