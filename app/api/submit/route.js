import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  const data = await request.json();
  debugger
  const { email, password, aboutMe, address, birthdate } = data;

  const user = await prisma.user.create({
    data: {
      email,
      password,
      aboutMe,
      birthdate: birthdate ? new Date(birthdate) : null,
      address: address ? {
        create: {
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.zip,
        },
      } : undefined,
    },
  });

  return new Response(JSON.stringify(user), { status: 200 });
}