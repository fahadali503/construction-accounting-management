import axios from "axios";
import { tokenUtils } from "../lib/token";

export const BASE_API = axios.create({
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

// Request interceptor to add token
BASE_API.interceptors.request.use(
    (config) => {
        const token = tokenUtils.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token expiry
BASE_API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            tokenUtils.removeToken();

            // Only redirect if we're in a browser environment
            if (typeof window !== 'undefined') {
                // window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);