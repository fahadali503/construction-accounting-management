import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { DashboardStats } from '@/lib/types'

const API_BASE_URL = '/api'

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/dashboard/stats`)
      return response.data
    },
  })
}
