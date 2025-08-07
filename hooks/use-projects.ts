import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Project } from '@/lib/types'

const API_BASE_URL = '/api'

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/projects`)
      return response.data
    },
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (projectData: {
      name: string
      location?: string
      description?: string
    }) => {
      const response = await axios.post(`${API_BASE_URL}/projects`, projectData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
    },
  })
}
