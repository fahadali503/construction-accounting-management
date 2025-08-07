// Import from main types
import type { Project } from '../lib/types';

// Project interfaces
export interface ProjectSummary {
    id: string;
    name: string;
    status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
    progress: number;
    budget: number;
    spent: number;
    remaining: number;
    estimatedCompletion: Date;
}

export interface CreateProjectRequest {
    name: string;
    location?: string;
    description?: string;
    budget: number;
    estimatedStartDate: Date;
    estimatedEndDate: Date;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
    id: string;
}

// Re-export from main types
export type { Project };
