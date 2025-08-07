import { BASE_API } from "./base";
import {
    Receivable,
    ReceivablePayment,
    ReceivableWithPayments,
    PaginatedReceivables
} from "../types/receivables.interface";

// Types for API requests
export interface CreateReceivableRequest {
    projectId: string;
    customerId: string;
    amount: number;
    description?: string;
    date: string;
}

export interface CreateReceivablePaymentRequest {
    amount: number;
    date: string;
    note?: string;
}

export interface ReceivableFilters {
    page?: number;
    limit?: number;
    projectId?: string;
    customerId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
}

export const receivablesApi = {
    // Create a new receivable
    createReceivable: async (data: CreateReceivableRequest): Promise<Receivable> => {
        const response = await BASE_API.post('/receivables', data);
        return response.data;
    },

    // Get all receivables with filters
    getReceivables: async (filters: ReceivableFilters = {}): Promise<PaginatedReceivables> => {
        const response = await BASE_API.get('/receivables', {
            params: filters,
        });
        return response.data;
    },

    // Get receivable by ID
    getReceivableById: async (id: string): Promise<ReceivableWithPayments> => {
        const response = await BASE_API.get(`/receivables/${id}`);
        return response.data;
    },

    // Add payment to receivable
    addPayment: async (
        receivableId: string,
        data: CreateReceivablePaymentRequest
    ): Promise<{ payment: ReceivablePayment; receivable: Receivable }> => {
        const response = await BASE_API.post(`/receivables/${receivableId}/payments`, data);
        return response.data;
    },

    // Get payments for a receivable
    getPayments: async (receivableId: string): Promise<ReceivablePayment[]> => {
        const response = await BASE_API.get(`/receivables/${receivableId}/payments`);
        return response.data;
    },
};
