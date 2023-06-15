import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

// Initialize a new Prisma client
const prisma = new PrismaClient();

// Export an event handler function
export default defineEventHandler(async () => {
  // Use the Prisma client to fetch all users from the database
  const users = await prisma.user.findMany();

  // Return the fetched users
  return users;
});
