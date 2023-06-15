import { eventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  image_url: z.string(),
});

export default eventHandler(async (event) => {
  const body = await readBody(event);

  const validatedBody = createUserSchema.safeParse(body);

  if (!validatedBody.success) {
    return { error: validatedBody.error.message };
  }

  const user = await prisma.user.create({
    data: body,
  });

  return user;
});
