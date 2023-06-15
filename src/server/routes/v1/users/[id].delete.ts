import { eventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

// Initialize a new Prisma client
const prisma = new PrismaClient();

// Define a schema for the 'deleteUser' function parameters using Zod
const deleteUserSchema = z.object({
  id: z.string().uuid(), // Expecting a string in UUID format for the 'id'
});

// Export an event handler function
export default eventHandler(async (event) => {
  // If the 'params' object or the 'id' field within it is not present in the event context, throw an error
  if (!event.context.params || !('id' in event.context.params)) {
    throw new Error('Invalid request context params');
  }

  // Destructure the 'id' from the 'params' object
  const { id } = event.context.params;

  // Validate the 'id' using the 'deleteUserSchema'
  const validatedParams = deleteUserSchema.safeParse({ id });

  // If the validation was not successful, throw the validation errors
  if (!validatedParams.success) {
    throw new z.ZodError(validatedParams.error.errors);
  }

  // Delete the user from the database using Prisma Client and the validated 'id'
  const user = await prisma.user.delete({
    where: {
      id: validatedParams.data.id,
    },
  });

  // Return the deleted user
  return user;
});
