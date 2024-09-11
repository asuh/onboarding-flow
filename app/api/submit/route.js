import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        aboutMe: data.aboutMe,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        birthdate: data.birthdate ? new Date(data.birthdate) : null,
      },
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
