import { BASE_API } from "./base";
import {
    ConstructionCategory,
    ContractorWork,
    MaterialSupply,
    CreateConstructionCategoryRequest,
    CreateContractorWorkRequest,
    CreateMaterialSupplyRequest,
    ContractorWorkFilters,
    MaterialSupplyFilters,
    PaginatedContractorWorks,
    PaginatedMaterialSupplies,
    PaginatedConstructionCategories,
    ProjectSummary,
    MaterialSummary
} from "../types/construction.interface";

export const constructionApi = {
    // Construction Categories
    createCategory: async (data: CreateConstructionCategoryRequest): Promise<ConstructionCategory> => {
        const response = await BASE_API.post('/construction/categories', data);
        return response.data;
    },

    getCategories: async (projectId: string): Promise<ConstructionCategory[]> => {
        const response = await BASE_API.get(`/construction/categories/project/${projectId}`);
        return response.data;
    },

    updateCategory: async (id: string, data: Partial<CreateConstructionCategoryRequest>): Promise<ConstructionCategory> => {
        const response = await BASE_API.patch(`/construction/categories/${id}`, data);
        return response.data;
    },

    deleteCategory: async (id: string): Promise<void> => {
        await BASE_API.delete(`/construction/categories/${id}`);
    },

    // Contractor Works
    createContractorWork: async (data: CreateContractorWorkRequest): Promise<ContractorWork> => {
        const response = await BASE_API.post('/construction/contractor-works', data);
        return response.data;
    },

    getContractorWorks: async (filters: ContractorWorkFilters = {}): Promise<PaginatedContractorWorks> => {
        const response = await BASE_API.get('/construction/contractor-works', {
            params: filters,
        });
        return response.data;
    },

    getContractorWorkById: async (id: string): Promise<ContractorWork> => {
        const response = await BASE_API.get(`/construction/contractor-works/${id}`);
        return response.data;
    },

    updateContractorWork: async (id: string, data: Partial<CreateContractorWorkRequest>): Promise<ContractorWork> => {
        const response = await BASE_API.patch(`/construction/contractor-works/${id}`, data);
        return response.data;
    },

    deleteContractorWork: async (id: string): Promise<void> => {
        await BASE_API.delete(`/construction/contractor-works/${id}`);
    },

    // Material Supplies
    createMaterialSupply: async (data: CreateMaterialSupplyRequest): Promise<MaterialSupply> => {
        const response = await BASE_API.post('/construction/material-supplies', data);
        return response.data;
    },

    getMaterialSupplies: async (filters: MaterialSupplyFilters = {}): Promise<PaginatedMaterialSupplies> => {
        const response = await BASE_API.get('/construction/material-supplies', {
            params: filters,
        });
        return response.data;
    },

    getMaterialSupplyById: async (id: string): Promise<MaterialSupply> => {
        const response = await BASE_API.get(`/construction/material-supplies/${id}`);
        return response.data;
    },

    updateMaterialSupply: async (id: string, data: Partial<CreateMaterialSupplyRequest>): Promise<MaterialSupply> => {
        const response = await BASE_API.patch(`/construction/material-supplies/${id}`, data);
        return response.data;
    },

    deleteMaterialSupply: async (id: string): Promise<void> => {
        await BASE_API.delete(`/construction/material-supplies/${id}`);
    },

    // Project Summary and Reports
    getProjectSummary: async (projectId: string): Promise<ProjectSummary> => {
        const response = await BASE_API.get(`/construction/reports/project/${projectId}`);
        return response.data;
    },

    getAllProjectsSummary: async (): Promise<ProjectSummary[]> => {
        const response = await BASE_API.get('/construction/reports/projects');
        return response.data;
    },

    getMaterialSummary: async (projectIds?: string[]): Promise<MaterialSummary[]> => {
        const params = projectIds ? { projectIds: projectIds.join(',') } : {};
        const response = await BASE_API.get('/construction/reports/materials', { params });
        return response.data;
    },

    // Category-based reports
    getCategoryWiseReport: async (projectId: string, categoryId: string) => {
        const response = await BASE_API.get(`/construction/category-report/${projectId}/${categoryId}`);
        return response.data;
    },

    // Vendor-based reports
    getVendorWiseReport: async (projectId: string, vendorId: string) => {
        const response = await BASE_API.get(`/construction/vendor-report/${projectId}/${vendorId}`);
        return response.data;
    }
};
