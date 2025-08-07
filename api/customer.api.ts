import { BASE_API } from './base';
import {
    Customer,
    CreateCustomerData,
    UpdateCustomerData,
    CustomerFilters,
    PaginatedCustomers
} from '@/types/customer.interface';

// Types for API requests
export interface CreateCustomerRequest {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    openingBalance?: number;
    projectId: string;
}

export interface UpdateCustomerRequest {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    openingBalance?: number;
}

export type { CustomerFilters };

export const customerApi = {
    // Create a new customer
    createCustomer: async (data: CreateCustomerRequest): Promise<Customer> => {
        const response = await BASE_API.post('/customers', data);
        return response.data;
    },

    // Get all customers with filters
    getCustomers: async (filters: CustomerFilters = {}): Promise<PaginatedCustomers> => {
        const response = await BASE_API.get('/customers', {
            params: filters,
        });
        return response.data;
    },

    // Get customer by ID
    getCustomerById: async (id: string): Promise<Customer> => {
        const response = await BASE_API.get(`/customers/${id}`);
        return response.data;
    },

    // Update customer
    updateCustomer: async (id: string, data: UpdateCustomerRequest): Promise<Customer> => {
        const response = await BASE_API.patch(`/customers/${id}`, data);
        return response.data;
    },

    // Delete customer
    deleteCustomer: async (id: string): Promise<void> => {
        await BASE_API.delete(`/customers/${id}`);
    },

    // Legacy methods for backward compatibility
    getAll: async (): Promise<Customer[]> => {
        const response = await customerApi.getCustomers();
        return response.data;
    },

    getByProject: async (projectId: string): Promise<Customer[]> => {
        const response = await customerApi.getCustomers({ projectId });
        return response.data;
    },

    getById: async (id: string): Promise<Customer> => {
        return customerApi.getCustomerById(id);
    },

    create: async (data: CreateCustomerData): Promise<Customer> => {
        return customerApi.createCustomer(data);
    },

    update: async (id: string, data: UpdateCustomerData): Promise<Customer> => {
        return customerApi.updateCustomer(id, data);
    },

    delete: async (id: string): Promise<void> => {
        return customerApi.deleteCustomer(id);
    },
}; 