import { BASE_API } from './base';
import {
    Vendor,
    CreateVendorData,
    UpdateVendorData,
    VendorType,
    VendorFilters,
    PaginatedVendors
} from '../types/vendor.interface';

// Types for API requests
export interface CreateVendorRequest {
    name: string;
    type: VendorType;
    openingBalance?: number;
    projectId: string;
}

export interface UpdateVendorRequest {
    name?: string;
    type?: VendorType;
    openingBalance?: number;
}

export type { VendorFilters };

export const vendorApi = {
    // Create a new vendor
    createVendor: async (data: CreateVendorRequest): Promise<Vendor> => {
        const response = await BASE_API.post('/vendors', data);
        return response.data;
    },

    // Get all vendors with filters
    getVendors: async (filters: VendorFilters = {}): Promise<PaginatedVendors> => {
        const response = await BASE_API.get('/vendors', {
            params: filters,
        });
        return response.data;
    },

    // Get vendor by ID
    getVendorById: async (id: string): Promise<Vendor> => {
        const response = await BASE_API.get(`/vendors/${id}`);
        return response.data;
    },

    // Update vendor
    updateVendor: async (id: string, data: UpdateVendorRequest): Promise<Vendor> => {
        const response = await BASE_API.patch(`/vendors/${id}`, data);
        return response.data;
    },

    // Delete vendor
    deleteVendor: async (id: string): Promise<void> => {
        await BASE_API.delete(`/vendors/${id}`);
    },

    // Legacy methods for backward compatibility
    getAll: async (): Promise<Vendor[]> => {
        const response = await vendorApi.getVendors();
        return response.data;
    },

    getByProject: async (projectId: string): Promise<Vendor[]> => {
        const response = await vendorApi.getVendors({ projectId });
        return response.data;
    },

    getByType: async (type: VendorType): Promise<Vendor[]> => {
        const response = await vendorApi.getVendors({ type });
        return response.data;
    },

    getById: async (id: string): Promise<Vendor> => {
        return vendorApi.getVendorById(id);
    },

    create: async (data: CreateVendorData): Promise<Vendor> => {
        return vendorApi.createVendor(data);
    },

    update: async (id: string, data: UpdateVendorData): Promise<Vendor> => {
        return vendorApi.updateVendor(id, data);
    },

    delete: async (id: string): Promise<void> => {
        return vendorApi.deleteVendor(id);
    },
};
