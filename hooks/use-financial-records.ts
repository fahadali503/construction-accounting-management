import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FinancialRecord } from '@/lib/types'

const API_BASE_URL = '/api'

export const useFinancialRecords = (projectId: string) => {
    return useQuery<FinancialRecord[]>({
        queryKey: ['financial-records', projectId],
        queryFn: async () => {
            const response = await axios.get(`${API_BASE_URL}/financial-records/${projectId}`)
            return response.data
        },
    })
}

export const useCreateFinancialRecord = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (recordData: {
            projectId: string
            date: Date
            description: string
            category: 'Contractor' | 'Vendor' | 'Supplier'
            trade: string
            unit: string
            unitRatePrice: number
            qty: number
            totalAmount: number
        }) => {
            const response = await axios.post(`${API_BASE_URL}/financial-records`, recordData)
            return response.data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['financial-records', variables.projectId] })
        },
    })
}
