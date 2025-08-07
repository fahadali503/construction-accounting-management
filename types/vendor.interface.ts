// Vendor interfaces
export interface Vendor {
    id: string;
    name: string;
    type: 'contractor' | 'supplier' | 'service_provider';
    contactInfo: {
        email: string;
        phone: string;
        address?: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    };
    specialties: string[];
    rating?: number;
    paymentTerms: string;
    taxId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateVendorRequest {
    name: string;
    type: 'contractor' | 'supplier' | 'service_provider';
    contactInfo: {
        email: string;
        phone: string;
        address?: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
    };
    specialties: string[];
    paymentTerms: string;
    taxId?: string;
}

export interface UpdateVendorRequest extends Partial<CreateVendorRequest> {
    id: string;
}

export interface VendorPerformance {
    vendorId: string;
    projectsCompleted: number;
    averageRating: number;
    onTimeDelivery: number;
    totalPaid: number;
}
