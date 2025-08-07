# Authentication System

This is a scalable authentication system built with React Hook Form, Zod validation, and shadcn/ui components.

## Features

- ✅ Sign in and sign up forms with validation
- ✅ Type-safe forms with Zod schema validation
- ✅ Token-based authentication
- ✅ Reusable form components
- ✅ Error handling and loading states
- ✅ Password visibility toggle
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Auth context for app-wide state management

## Components

### Form Components

- `SignInForm` - Standalone sign-in form component
- `SignUpForm` - Standalone sign-up form component
- `AuthTabs` - Combined component with tabs for both forms

### Pages

- `/signin` - Dedicated sign-in page
- `/signup` - Dedicated sign-up page
- `/auth` - Combined auth page with tabs

## Usage

### Basic Usage

```tsx
import { SignInForm, SignUpForm, AuthTabs } from '@/components/auth';

// Standalone sign-in form
<SignInForm />

// Standalone sign-up form
<SignUpForm />

// Combined form with tabs
<AuthTabs />
```

### Advanced Usage with Custom Props

```tsx
import { SignInForm } from '@/components/auth';

// Custom success callback
<SignInForm 
  onSuccess={() => {
    console.log('User signed in successfully');
    // Custom logic here
  }}
  redirectTo="/custom-dashboard"
  showCard={false}
  title="Custom Sign In"
  description="Custom description"
/>
```

### Using Auth Context

```tsx
import { useAuthContext } from '@/components/providers/AuthProvider';

function MyComponent() {
  const { user, isLoading, isAuthenticated, signOut } = useAuthContext();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;

  return (
    <div>
      <p>Welcome, {user.fullName}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

## API Integration

The forms automatically integrate with your API endpoints:

- `POST /auth/signin` - Sign in endpoint
- `POST /auth/signup` - Sign up endpoint
- `POST /auth/signout` - Sign out endpoint
- `GET /auth/profile` - Get user profile

### Request/Response Types

```typescript
// Sign In Request
{
  email: string;
  password: string;
}

// Sign Up Request
{
  email: string;
  fullName: string;
  password: string;
}

// Auth Response
{
  accessToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
  };
}
```

## Validation

Forms use Zod schemas for validation:

- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Full Name: Required, 2-50 characters
- Confirm Password: Must match password

## Customization

### Styling

The components use Tailwind CSS and can be customized by:

1. Modifying the component styles directly
2. Using CSS variables for theme customization
3. Overriding shadcn/ui component styles

### Form Behavior

You can customize form behavior by:

- Providing custom `onSuccess` callbacks
- Setting custom redirect URLs
- Showing/hiding card containers
- Custom titles and descriptions

### Validation

Extend the Zod schemas in `/lib/validations/auth.ts`:

```typescript
export const signUpSchema = z.object({
  // ... existing fields
  phoneNumber: z.string().optional(),
  // Add more fields as needed
});
```

## Error Handling

The system includes comprehensive error handling:

- Network errors
- Validation errors
- API errors with field-specific feedback
- Toast notifications for user feedback

## Token Management

Tokens are automatically managed:

- Stored securely in localStorage
- Added to API requests via interceptors
- Removed on sign out or token expiry
- Automatic redirect on authentication failure

## File Structure

```
components/
  auth/
    SignInForm.tsx
    SignUpForm.tsx
    AuthTabs.tsx
    index.ts
  providers/
    AuthProvider.tsx
lib/
  validations/
    auth.ts
hooks/
  useAuth.ts
api/
  auth.api.ts
types/
  user.interface.ts
app/
  signin/
    page.tsx
  signup/
    page.tsx
  auth/
    page.tsx
```

## Dependencies

- `react-hook-form` - Form state management
- `@hookform/resolvers/zod` - Zod integration
- `zod` - Schema validation
- `axios` - HTTP client
- `sonner` - Toast notifications
- `lucide-react` - Icons
- `shadcn/ui` - UI components
```
