import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tuck = await prisma.user.upsert({
    where: { email: 'tuck@testemail.com' },
    update: {},
    create: {
      id: 'a587f162-9828-4c2e-9372-2fef4ce52de1',
      email: 'tuck@testemail.com',
      name: 'Tuck',
      image_url:
        'https://images.unsplash.com/photo-1537183707088-ab8b0fba3db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
  });
  const jerry = await prisma.user.upsert({
    where: { email: 'jerry@testemail.com' },
    update: {},
    create: {
      id: 'bc866115-cb47-446b-b72c-c667f81d4099',
      email: 'jerry@testemail.com',
      name: 'Jerry',
      image_url:
        'https://images.unsplash.com/photo-1572015725642-358fb4455c9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
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
