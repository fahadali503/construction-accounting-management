export interface Project {
  id: string
  name: string
  location?: string
  description?: string
  contractorCost: number
  materialCost: number
  totalCost: number
  budget: number
  variance: number
  createdAt: Date
  updatedAt: Date
}

export interface FinancialRecord {
  id: string
  projectId: string
  date: Date
  description: string
  category: 'Contractor' | 'Vendor' | 'Supplier'
  trade: string
  unit: string
  unitRatePrice: number
  qty: number
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  date: Date
  notes: string
  category: string
  credit: number
  debit: number
  balance: number
  projectId: string
  createdAt: Date
  updatedAt: Date
}

export interface ProjectWithTransactions extends Project {
  transactions: Transaction[]
}

export interface DashboardStats {
  totalProjects: number
  totalContractors: number
  totalSuppliers: number
  totalSpent: number
}

export interface ProjectSummary {
  totalCredit: number
  totalDebit: number
  totalBalance: number
  entryCount: number
}
