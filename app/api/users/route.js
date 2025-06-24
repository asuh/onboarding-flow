import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Try to get users with timestamps first
    let users;
    try {
      users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      // If that fails, try without the timestamp
      console.log('Timestamp-based query failed, falling back to simple query');
      users = await prisma.user.findMany();
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch users',
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
