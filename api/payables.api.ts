import { BASE_API } from "./base";
import {
    Payable,
    PayablePayment,
    PayableWithPayments,
    PaginatedPayables
} from "../types/payables.interface";

// Types for API requests
export interface CreatePayableRequest {
    projectId: string;
    vendorId: string;
    amount: number;
    purpose?: string;
    date: string;
    billNumber?: string;
}

export interface CreatePayablePaymentRequest {
    amount: number;
    date: string;
    note?: string;
}

export interface PayableFilters {
    page?: number;
    limit?: number;
    projectId?: string;
    vendorId?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
}

export const payablesApi = {
    // Create a new payable
    createPayable: async (data: CreatePayableRequest): Promise<Payable> => {
        const response = await BASE_API.post('/payables', data);
        return response.data;
    },

    // Get all payables with filters
    getPayables: async (filters: PayableFilters = {}): Promise<PaginatedPayables> => {
        const response = await BASE_API.get('/payables', {
            params: filters,
        });
        return response.data;
    },

    // Get payable by ID
    getPayableById: async (id: string): Promise<PayableWithPayments> => {
        const response = await BASE_API.get(`/payables/${id}`);
        return response.data;
    },

    // Add payment to payable
    addPayment: async (
        payableId: string,
        data: CreatePayablePaymentRequest
    ): Promise<{ payment: PayablePayment; payable: Payable }> => {
        const response = await BASE_API.post(`/payables/${payableId}/payments`, data);
        return response.data;
    },

    // Get payments for a payable
    getPayments: async (payableId: string): Promise<PayablePayment[]> => {
        const response = await BASE_API.get(`/payables/${payableId}/payments`);
        return response.data;
    },
};
