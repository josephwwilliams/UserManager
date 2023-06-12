import { eventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const fetchUserSchema = z.object({
  id: z.string().uuid(),
});

export default eventHandler(async (event) => {
  if (!event.context.params || !('id' in event.context.params)) {
    throw new Error('Invalid request context params');
  }

  const { id } = event.context.params;

  const validatedParams = fetchUserSchema.safeParse({ id });

  if (!validatedParams.success) {
    throw new z.ZodError(validatedParams.error.errors);
  }

  const user = await prisma.user.findFirst({
    where: {
      id: validatedParams.data.id,
    },
  });

  if (!user) throw new Error('No User Found!');

  return user;
});
