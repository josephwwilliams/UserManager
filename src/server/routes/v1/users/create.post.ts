import { eventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Initialize a new Prisma client
const prisma = new PrismaClient();

// Define schema for validating incoming user data
const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image_url: z.string(),
});

// Export an event handler function
export default eventHandler(async (event) => {
  // Read the body from the event
  const body = await readBody(event);

  // Validate the body using the schema
  const validatedBody = createUserSchema.safeParse(body);

  // If validation fails, return the error message
  if (!validatedBody.success) {
    return { error: validatedBody.error.message };
  }

  // If validation is successful, use Prisma client to create a new user in the database
  const user = await prisma.user.create({
    data: body,
  });

  // Return the created user
  return user;
});
