import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('SignIn Request Body:', body);
    return NextResponse.json({ message: 'SignIn successful', data: body });
  } catch (error) {
    console.error('Error processing SignIn request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
