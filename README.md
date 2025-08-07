# Hittah Engineers & Contractors - Construction Management Platform

This is a [Next.js](https://nextjs.org) project for Hittah Engineers & Contractors, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## About

Professional construction management platform for Hittah Engineers & Contractors. Manage projects, track finances, and streamline operations with our comprehensive construction management solution.

## Screenshots

### Dashboard Overview
![Dashboard Overview](./docs/dashboard-overview.png)
*Main dashboard showing project overview with summary cards for total projects, contractors, suppliers, and expenses*

### Financial Records Management
![Financial Records](./docs/financial-records.png)
*Detailed financial records view with comprehensive filtering, summary metrics, and expense tracking for individual projects*

## Features

- **Project Management**: Create and manage construction projects with detailed tracking
- **Financial Records**: Comprehensive expense tracking with filtering capabilities
- **Dashboard Analytics**: Real-time overview of projects, contractors, suppliers, and expenses
- **Advanced Filtering**: Dropdown filters for all table columns (date, description, category, trade, unit, amounts)
- **Summary Metrics**: Total records, credit, debit, and balance calculations
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS

## Technical Stack

- **Frontend**: Next.js 15.4.4 with React 19.0.0
- **Language**: TypeScript for type safety
- **Database**: Prisma ORM with SQLite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React and Tabler Icons
- **Date Handling**: date-fns library

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── projects/      # Project management endpoints
│   │   ├── financial-records/ # Financial records endpoints
│   │   └── dashboard/     # Dashboard statistics
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── dashboard/        # Dashboard-specific components
│   ├── project/          # Project management components
│   ├── ui/              # Reusable UI components
│   └── app-sidebar.tsx   # Main navigation sidebar
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── prisma/              # Database schema and migrations
└── public/              # Static assets including logo
```

## Database Schema

The application uses Prisma ORM with the following main models:

- **Project**: Construction projects with name, location, and description
- **FinancialRecord**: Expense tracking with categories, trades, and amounts
- **Transaction**: Financial transactions linked to projects

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up the database:

```bash
npx prisma migrate dev
npx prisma db seed
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Creating Projects
1. Click "New Project" on the dashboard
2. Fill in project name, location, and description
3. Save to create the project

### Managing Financial Records
1. Click "View Project" from the project dropdown menu
2. Use "Add Financial Record" to track expenses
3. Apply filters using the dropdown icons in table headers
4. Monitor summary metrics (Total Credit, Debit, Balance)

### Navigation
- Use the sidebar to navigate between different sections
- Dashboard provides an overview of all projects
- Each project has its own financial records view

## Development

This project uses:

- **TypeScript** for type safety
- **Prisma** for database management
- **TanStack Query** for server state management
- **Tailwind CSS** with **shadcn/ui** for styling
- **ESLint** and **Prettier** for code quality

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## License

This project is developed for Hittah Engineers & Contractors.
