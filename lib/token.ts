/**
 * Token utility functions for authentication
 */

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const tokenUtils = {
    // Get token from localStorage
    getToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(TOKEN_KEY);
    },

    // Set token in localStorage
    setToken: (token: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(TOKEN_KEY, token);
    },

    // Remove token from localStorage
    removeToken: (): void => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },

    // Get refresh token
    getRefreshToken: (): string | null => {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    // Set refresh token
    setRefreshToken: (token: string): void => {
        if (typeof window === 'undefined') return;
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!tokenUtils.getToken();
    },

    // Clear all auth data
    clearAuthData: (): void => {
        tokenUtils.removeToken();
    }
};
