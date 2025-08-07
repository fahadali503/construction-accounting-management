// Re-export and import from main types
import type { Project, FinancialRecord, Transaction } from '../lib/types';

// Construction interfaces
export interface ConstructionProject extends Project {
    phases: ProjectPhase[];
    materials: Material[];
    contractors: Contractor[];
}

export interface ProjectPhase {
    id: string;
    name: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    status: 'planned' | 'in-progress' | 'completed' | 'delayed';
    budget: number;
    actualCost: number;
}

export interface Material {
    id: string;
    name: string;
    type: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    supplier: string;
    deliveryDate?: Date;
}

export interface Contractor {
    id: string;
    name: string;
    trade: string;
    contactInfo: {
        phone: string;
        email: string;
        address?: string;
    };
    ratePerHour?: number;
    rating?: number;
}

// Re-export from main types
export type { Project, FinancialRecord, Transaction };
