import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('SignUp Request Body:', body);
    return NextResponse.json({ message: 'SignUp successful'});
  } catch (error) {
    console.error('Error processing SignUp request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
