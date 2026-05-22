import { supabase, supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  }

  const { data: orders, error: ordersError } = await supabaseAdmin
    .from('orders')
    .select('*, products(name, price_usd)')
    .order('created_at', { ascending: false })

  if (ordersError) return NextResponse.json({ error: ordersError.message }, { status: 400 })
  return NextResponse.json({ orders })
}