import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.transaction.deleteMany()
  await prisma.project.deleteMany()

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      name: "Sajjad Factory Ansari Chowk Multan",
      contractorCost: 250000,
      materialCost: 150000,
      totalCost: 400000,
      budget: 450000,
      variance: 50000,
    },
  })

  const project2 = await prisma.project.create({
    data: {
      name: "Commercial Plaza Downtown",
      contractorCost: 300000,
      materialCost: 200000,
      totalCost: 500000,
      budget: 520000,
      variance: 20000,
    },
  })

  const project3 = await prisma.project.create({
    data: {
      name: "Residential Complex North",
      contractorCost: 180000,
      materialCost: 120000,
      totalCost: 300000,
      budget: 350000,
      variance: 50000,
    },
  })

  // Create sample transactions for project1 (matching the PDF report)
  const transactions = [
    {
      date: new Date('2025-06-26'),
      notes: 'Total expenses of Site (Cashbook Record)',
      category: 'Expenses',
      credit: 0,
      debit: 7532.060,
      balance: -7532.060,
      projectId: project1.id,
    },
    {
      date: new Date('2025-06-25'),
      notes: 'Total Receiving From Site (Cashbook Record)',
      category: 'Receiving',
      credit: 6300.000,
      debit: 0,
      balance: -1232.060,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-03'),
      notes: 'Direct Labour',
      category: 'LabourTools',
      credit: 0,
      debit: 2.650,
      balance: -1234.710,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-03'),
      notes: 'Fazzil',
      category: 'Freights',
      credit: 0,
      debit: 3.000,
      balance: -1237.710,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-03'),
      notes: 'Ramzan',
      category: 'StealFixer',
      credit: 0,
      debit: 6.500,
      balance: -1244.210,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-03'),
      notes: 'Allah Diwaya Plaster',
      category: 'Contractor',
      credit: 0,
      debit: 70.000,
      balance: -1314.210,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-03'),
      notes: 'Riaz Cont Flooring',
      category: 'Contractor',
      credit: 0,
      debit: 77.000,
      balance: -1391.210,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-10'),
      notes: 'Direct Labour',
      category: 'LabourWork',
      credit: 0,
      debit: 14.250,
      balance: -1405.460,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-10'),
      notes: 'Site Labour',
      category: 'Refreshments',
      credit: 0,
      debit: 1.000,
      balance: -1406.460,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-10'),
      notes: 'Ahmed',
      category: 'Contractor',
      credit: 0,
      debit: 10.000,
      balance: -1416.460,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-10'),
      notes: 'Allah Diwaya Plaster',
      category: 'Contractor',
      credit: 0,
      debit: 30.000,
      balance: -1446.460,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-17'),
      notes: 'Direct Labour',
      category: 'LabourWork',
      credit: 0,
      debit: 28.350,
      balance: -1474.810,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-17'),
      notes: 'Fazzil',
      category: 'Freights',
      credit: 0,
      debit: 1.300,
      balance: -1476.110,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-17'),
      notes: 'Roshan Tiles Fixer',
      category: 'Contractor',
      credit: 0,
      debit: 10.000,
      balance: -1486.110,
      projectId: project1.id,
    },
    {
      date: new Date('2025-07-17'),
      notes: 'Ahmed Tuiffelles',
      category: 'Contractor',
      credit: 0,
      debit: 10.000,
      balance: -1496.110,
      projectId: project1.id,
    },
  ]

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    })
  }

  // Create some transactions for other projects
  await prisma.transaction.createMany({
    data: [
      {
        date: new Date('2025-08-01'),
        notes: 'Initial payment',
        category: 'Payment',
        credit: 50000,
        debit: 0,
        balance: 50000,
        projectId: project2.id,
      },
      {
        date: new Date('2025-08-02'),
        notes: 'Material purchase',
        category: 'Materials',
        credit: 0,
        debit: 25000,
        balance: 25000,
        projectId: project2.id,
      },
      {
        date: new Date('2025-08-01'),
        notes: 'Project advance',
        category: 'Payment',
        credit: 30000,
        debit: 0,
        balance: 30000,
        projectId: project3.id,
      },
    ],
  })

  console.log('Database has been seeded.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
