import { supabase } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, password } = await request.json()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({
    message: 'Logged in successfully',
    session: data.session,
    user: data.user
  })
}