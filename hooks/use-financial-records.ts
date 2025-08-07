import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FinancialRecord } from '@/lib/types'

const API_BASE_URL = '/api'

export const useFinancialRecords = (projectId: string) => {
    return useQuery<FinancialRecord[]>({
        queryKey: ['financial-records', projectId],
        queryFn: async () => {
            console.log('Fetching financial records for project:', projectId)
            const response = await axios.get(`${API_BASE_URL}/financial-records/${projectId}`)
            console.log('Financial records response:', response.data)
            return response.data
        },
        enabled: !!projectId, // Only run if projectId is provided
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
        onSuccess: (data, variables) => {
            console.log('Financial record created successfully:', data)
            console.log('Invalidating cache for project:', variables.projectId)

            // Invalidate and refetch the financial records query
            queryClient.invalidateQueries({
                queryKey: ['financial-records', variables.projectId],
                exact: true
            })

            // Also refetch the query immediately
            queryClient.refetchQueries({
                queryKey: ['financial-records', variables.projectId],
                exact: true
            })
        },
        onError: (error) => {
            console.error('Error creating financial record:', error)
        }
    })
}
