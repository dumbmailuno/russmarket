import { supabase, supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

// GET - anyone can fetch all active products
export async function GET() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ products: data })
}

// POST - admin only, add a new product
export async function POST(request) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')

  // Verify the user
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  // Check if user is admin
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  }

  const { name, description, price_usd, file_path, cover_image } = await request.json()

  if (!name || !price_usd || !file_path) {
    return NextResponse.json({ error: 'name, price_usd and file_path are required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert([{ name, description, price_usd, file_path, cover_image }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ product: data }, { status: 201 })
}