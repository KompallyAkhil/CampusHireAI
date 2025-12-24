import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    // Verify Password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    if (user.role !== role) {
      return NextResponse.json({ error: 'Access denied: Incorrect role' }, { status: 403 });
    }

    // Generate JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default_secret');
    const token = await new SignJWT({ 
        userId: user.id, 
        email: user.email, 
        role: user.role, 
        name: user.name 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d')
      .sign(secret);

    return NextResponse.json({ 
      message: 'SignIn successful', 
      data: { 
        ...user, 
        token,
        expiresAt: Date.now() + 30 * 1000 // 30 seconds from now
      } 
    });
  } catch (error) {
    console.error('Error processing SignIn request:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
