import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
  try {
    const { data: alerts, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
       console.error("Supabase Fetch Error:", error);
       return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, deadline } = body;

    if (!title || !message || !deadline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('alerts')
      .insert([{ title, message, deadline }])
      .select();

    if (error) {
        console.error("Supabase Insert Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Alert created successfully', alert: data });
  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
