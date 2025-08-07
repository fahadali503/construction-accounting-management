/**
 * User authentication interfaces
 */

export interface User {
    id: string;
    email: string;
    name: string;
    role?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SignInRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
    message?: string;
}

export interface AuthError {
    message: string;
    field?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: AuthError | null;
}
