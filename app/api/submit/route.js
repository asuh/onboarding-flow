import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      email,
      password,
      aboutMe,
      street,
      city,
      state,
      zip,
      birthdate
    } = data;

    // Simple validation
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
    }

    // Convert birthdate to Date object if it exists
    const birthdateDate = birthdate ? new Date(birthdate) : null;

    // Save data to database
    const user = await prisma.user.create({
      data: {
        email,
        password,
        aboutMe,
        street,
        city,
        state,
        zip,
        birthdate: birthdateDate
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}