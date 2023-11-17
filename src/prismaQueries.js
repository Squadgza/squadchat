// prismaQueries.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchPrismaData() {
  try {
    const dataFromPrisma = await prisma.user.findMany(); // Replace with your actual query
    console.log('data in prisma', dataFromPrisma)
    return dataFromPrisma;
  } catch (error) {
    throw new Error('Unable to fetch data from Prisma');
  }
}
