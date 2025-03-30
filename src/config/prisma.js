const { PrismaClient } = require('@prisma/client');

// Use a global variable to prevent multiple instances in development
// const globalForPrisma = global;

// const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const prisma = new PrismaClient()

module.exports = prisma;