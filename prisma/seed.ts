import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tuck = await prisma.user.upsert({
    where: { email: 'tuck@testemail.com' },
    update: {},
    create: {
      email: 'tuck@testemail.com',
      name: 'Tuck',
    },
  });
  const jerry = await prisma.user.upsert({
    where: { email: 'jerry@testemail.com' },
    update: {},
    create: {
      email: 'jerry@testemail.com',
      name: 'Jerry',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
