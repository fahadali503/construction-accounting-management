// Payables interfaces
export interface Payable {
    id: string;
    projectId: string;
    vendorName: string;
    description: string;
    amount: number;
    dueDate: Date;
    status: 'pending' | 'paid' | 'overdue' | 'cancelled';
    category: 'materials' | 'labor' | 'equipment' | 'services' | 'other';
    invoiceNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatePayableRequest {
    projectId: string;
    vendorName: string;
    description: string;
    amount: number;
    dueDate: Date;
    category: 'materials' | 'labor' | 'equipment' | 'services' | 'other';
    invoiceNumber?: string;
}

export interface UpdatePayableRequest extends Partial<CreatePayableRequest> {
    id: string;
}

export interface PayablesSummary {
    totalPending: number;
    totalPaid: number;
    totalOverdue: number;
    count: number;
}
