import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('SignIn Request Body:', body);
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error) {
      console.error('Supabase SignIn Error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const user = users && users.length > 0 ? users[0] : null;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    if (user.role !== role) {
      return NextResponse.json({ error: 'Access denied: Incorrect role' }, { status: 403 });
    }

    return NextResponse.json({ message: 'SignIn successful', data: user });
  } catch (error) {
    console.error('Error processing SignIn request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
