import { supabase } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const { email, password, full_name } = await request.json()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name }
    }
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({
    message: 'Account created. Please check your email to confirm.',
    user: data.user
  })
}