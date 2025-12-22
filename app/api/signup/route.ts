import { NextResponse } from 'next/server';
import { connectMongoDb } from '@/lib/connectMongoDb';
import User from '@/app/models/User';

export async function POST(request: Request) {
  try {
    await connectMongoDb();
    const body = await request.json();
    console.log('SignUp Request Body:', body);
    const { role, name, email, password } = body;

    if (!role || !name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const user = new User({ role, name, email, password });
    await user.save();

    console.log('SignUp Success:', body);
    return NextResponse.json({ message: 'SignUp successful' });
  } catch (error) {
    console.error('Error processing SignUp request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
