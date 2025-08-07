'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Project } from '@/lib/types'
import { Eye, Building2, MoreHorizontal, DollarSign } from 'lucide-react'

interface ProjectsTableProps {
  projects: Project[]
  onViewReport: (projectId: string) => void
  onViewProject: (projectId: string) => void
}

export function ProjectsTable({ projects, onViewReport, onViewProject }: ProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Building2 className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No construction projects found</h3>
        <p className="text-gray-600 mb-4">Create your first project to get started</p>
        <Button>Create your first project</Button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>{project.location || '-'}</TableCell>
              <TableCell className="max-w-xs truncate">
                {project.description || '-'}
              </TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewProject(project.id)}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      View Project
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onViewReport(project.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
