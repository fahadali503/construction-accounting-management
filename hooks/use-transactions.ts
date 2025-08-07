import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Transaction } from '@/lib/types'

const API_BASE_URL = '/api'

export const useTransactions = (projectId: string) => {
  return useQuery<Transaction[]>({
    queryKey: ['transactions', projectId],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/transactions/${projectId}`)
      return response.data
    },
    enabled: !!projectId,
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      projectId,
      transactionData
    }: {
      projectId: string
      transactionData: {
        date: string
        notes: string
        category: string
        credit: number
        debit: number
      }
    }) => {
      const response = await axios.post(
        `${API_BASE_URL}/transactions/${projectId}`,
        transactionData
      )
      return response.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions', variables.projectId] })
    },
  })
}
