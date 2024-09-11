import prisma from '@/lib/prisma';

export async function GET(request) {
  const url = new URL(request.url);
  const pageNumber = url.searchParams.get('pageNumber');

  try {
    const admins = await prisma.admin.findMany({
      where: { pageNumber: Number.parseInt(pageNumber, 10) },
      orderBy: { id: 'asc' },
    });

    return new Response(JSON.stringify(admins), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching admin configurations:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch admin configurations' }),
      { status: 500 }
    );
  }
}