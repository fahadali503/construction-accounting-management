import axios from "axios";

export const BASE_API = axios.create({
    baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
});

// Request interceptor to add authentication status  
BASE_API.interceptors.request.use(
    (config) => {
        const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem("authenticated") === "true";
        if (isAuthenticated) {
            config.headers = config.headers || {};
            config.headers['X-Authenticated'] = 'true';
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle authentication errors
BASE_API.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Authentication failed
            if (typeof window !== 'undefined') {
                localStorage.removeItem("authenticated");
                // Could redirect to login page if needed
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);