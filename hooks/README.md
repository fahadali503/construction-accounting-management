# React Query Hooks

This directory contains reusable React Query hooks for managing API state across the application.

## Structure

- `useProjects.ts` - Project-related queries and mutations
- `useVendors.ts` - Vendor-related queries and mutations  
- `useAuth.ts` - Authentication-related queries and mutations
- `index.ts` - Exports all hooks for easy importing

## Usage

### Importing Hooks

```typescript
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '@/hooks';
import { useVendors, useCreateVendor, useUpdateVendor, useDeleteVendor } from '@/hooks';
import { useSignIn, useSignUp, useSignOut, useUserProfile } from '@/hooks';
```

### Project Hooks

#### Queries
- `useProjects()` - Get all projects
- `useActiveProjects()` - Get active projects (PLANNED and IN_PROGRESS)
- `useCompletedProjects()` - Get completed projects
- `useProjectsByStatus(status)` - Get projects by specific status
- `useProject(id)` - Get single project by ID

#### Mutations
- `useCreateProject()` - Create new project
- `useUpdateProject()` - Update existing project
- `useDeleteProject()` - Delete project

### Vendor Hooks

#### Queries
- `useVendors()` - Get all vendors
- `useVendorsByProject(projectId)` - Get vendors by project
- `useVendorsByType(type)` - Get vendors by type
- `useVendor(id)` - Get single vendor by ID

#### Mutations
- `useCreateVendor()` - Create new vendor
- `useUpdateVendor()` - Update existing vendor
- `useDeleteVendor()` - Delete vendor

### Auth Hooks

#### Queries
- `useUserProfile()` - Get current user profile

#### Mutations
- `useSignIn()` - Sign in user
- `useSignUp()` - Sign up new user
- `useSignOut()` - Sign out user
- `useRefreshToken()` - Refresh authentication token

## Query Keys

Each module exports query keys for manual cache invalidation:

```typescript
import { projectQueryKeys, vendorQueryKeys, authQueryKeys } from '@/hooks';

// Invalidate specific queries
queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
queryClient.invalidateQueries({ queryKey: vendorQueryKeys.byProject(projectId) });
```

## Features

- **Automatic Error Handling**: All hooks include toast notifications for success/error states
- **Loading States**: Each hook provides `isLoading` and `isPending` states
- **Cache Management**: Automatic cache invalidation on mutations
- **Type Safety**: Full TypeScript support with proper typing
- **Authentication Integration**: Auth hooks handle token management and user state

## Example Usage

```typescript
function ProjectsPage() {
    const { data: projects, isLoading, error } = useProjects();
    const createMutation = useCreateProject();
    const updateMutation = useUpdateProject();
    const deleteMutation = useDeleteProject();

    const handleCreate = (data) => {
        createMutation.mutate(data);
    };

    const handleUpdate = (id, data) => {
        updateMutation.mutate({ id, data });
    };

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}
```

## Benefits

1. **Reusability**: Hooks can be used across different components
2. **Consistency**: Standardized error handling and loading states
3. **Maintainability**: Centralized API logic
4. **Performance**: Optimized caching and background updates
5. **Developer Experience**: Simplified component logic 