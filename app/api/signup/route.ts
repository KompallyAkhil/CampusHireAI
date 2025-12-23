import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('SignUp Request Body:', body);
    const { role, name, email, password } = body;

    if (!role || !name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user exists
    const { data: existingUsers, error: findError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email);

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ role, name, email, password: hashedPassword }])
      .select();

    if (error) {
        console.error('Supabase Insert Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('SignUp Success:', data);
    return NextResponse.json({ message: 'SignUp successful' });
  } catch (error) {
    console.error('Error processing SignUp request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

