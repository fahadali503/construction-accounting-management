import { BASE_API } from './base';
import {
    Project,
    CreateProjectData,
    UpdateProjectData,
    ProjectStatus,
    ProjectFilters,
    PaginatedProjects
} from '@/types/project.interface';

// Types for API requests
export interface CreateProjectRequest {
    name: string;
    description?: string;
    startDate: string;
    endDate?: string;
    openBalance?: number;
    status?: ProjectStatus;
}

export interface UpdateProjectRequest {
    name?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    openBalance?: number;
    status?: ProjectStatus;
}

export type { ProjectFilters };

export const projectApi = {
    // Create a new project
    createProject: async (data: CreateProjectRequest): Promise<Project> => {
        const response = await BASE_API.post('/projects', data);
        return response.data;
    },

    // Get all projects with filters
    getProjects: async (filters: ProjectFilters = {}): Promise<PaginatedProjects> => {
        const response = await BASE_API.get('/projects', {
            params: filters,
        });
        return response.data;
    },

    // Get project by ID
    getProjectById: async (id: string): Promise<Project> => {
        const response = await BASE_API.get(`/projects/${id}`);
        return response.data;
    },

    // Update project
    updateProject: async (id: string, data: UpdateProjectRequest): Promise<Project> => {
        const response = await BASE_API.patch(`/projects/${id}`, data);
        return response.data;
    },

    // Delete project
    deleteProject: async (id: string): Promise<void> => {
        await BASE_API.delete(`/projects/${id}`);
    },

    // Legacy methods for backward compatibility
    getAll: async (): Promise<Project[]> => {
        const response = await projectApi.getProjects();
        return response.data;
    },

    getActive: async (): Promise<Project[]> => {
        const response = await projectApi.getProjects({ status: ProjectStatus.IN_PROGRESS });
        return response.data;
    },

    getCompleted: async (): Promise<Project[]> => {
        const response = await projectApi.getProjects({ status: ProjectStatus.COMPLETED });
        return response.data;
    },

    getByStatus: async (status: ProjectStatus): Promise<Project[]> => {
        const response = await projectApi.getProjects({ status });
        return response.data;
    },

    getById: async (id: string): Promise<Project> => {
        return projectApi.getProjectById(id);
    },

    create: async (data: CreateProjectData): Promise<Project> => {
        return projectApi.createProject(data);
    },

    update: async (id: string, data: UpdateProjectData): Promise<Project> => {
        return projectApi.updateProject(id, data);
    },

    delete: async (id: string): Promise<void> => {
        return projectApi.deleteProject(id);
    },
};
