import { BASE_API } from "./base";
import { tokenUtils } from "../lib/token";
import { SignInRequest, SignUpRequest, AuthResponse, User } from "../types/user.interface";

// Add token to requests if available
BASE_API.interceptors.request.use((config: any) => {
    const token = tokenUtils.getToken();
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    signIn: async (data: SignInRequest): Promise<AuthResponse> => {
        const response = await BASE_API.post<AuthResponse>("/auth/signin", data);
        return response.data;
    },

    signUp: async (data: SignUpRequest): Promise<AuthResponse> => {
        const response = await BASE_API.post<AuthResponse>("/auth/signup", data);
        return response.data;
    },

    signOut: async (): Promise<void> => {
        await BASE_API.post("/auth/signout");
    },

    refreshToken: async (): Promise<AuthResponse> => {
        const response = await BASE_API.post<AuthResponse>("/auth/refresh");
        return response.data;
    },

    getProfile: async (): Promise<{ user: User }> => {
        const response = await BASE_API.get("/auth/profile");
        return response.data;
    },
};
