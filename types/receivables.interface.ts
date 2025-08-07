// Receivables interfaces
export interface Receivable {
    id: string;
    projectId: string;
    customerName: string;
    description: string;
    amount: number;
    dueDate: Date;
    status: 'pending' | 'received' | 'overdue' | 'cancelled';
    category: 'progress_payment' | 'final_payment' | 'change_order' | 'other';
    invoiceNumber?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateReceivableRequest {
    projectId: string;
    customerName: string;
    description: string;
    amount: number;
    dueDate: Date;
    category: 'progress_payment' | 'final_payment' | 'change_order' | 'other';
    invoiceNumber?: string;
}

export interface UpdateReceivableRequest extends Partial<CreateReceivableRequest> {
    id: string;
}

export interface ReceivablesSummary {
    totalPending: number;
    totalReceived: number;
    totalOverdue: number;
    count: number;
}
