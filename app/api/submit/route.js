import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('Received form data:', data);
    
    // Basic validation
    if (!data.email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'A user with this email already exists' }), 
        { status: 400 }
      );
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password || '', // In a real app, make sure to hash the password
        aboutMe: data.aboutMe || '',
        street: data.street || '',
        city: data.city || '',
        state: data.state || '',
        zip: data.zip || '',
        birthdate: data.birthdate ? new Date(data.birthdate) : null,
      },
    });

    console.log('Created user:', user);
    return new Response(JSON.stringify(user), { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving data:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to save user data',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
