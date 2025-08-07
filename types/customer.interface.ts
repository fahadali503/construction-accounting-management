// Import and re-export from main types
import type { Project } from '../lib/types';

// Customer interfaces
export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    type: 'individual' | 'company';
    createdAt: Date;
    updatedAt: Date;
}

export interface CustomerProject {
    id: string;
    customerId: string;
    projectId: string;
    customer: Customer;
    project: Project;
    contractValue: number;
    paymentTerms: string;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCustomerRequest {
    name: string;
    email: string;
    phone: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    type: 'individual' | 'company';
}

export interface UpdateCustomerRequest extends Partial<CreateCustomerRequest> {
    id: string;
}

// Re-export from main types
export type { Project };
