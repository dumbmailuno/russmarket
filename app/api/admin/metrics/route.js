import { supabase, supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single()
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  }

  const [
    { count: totalProducts },
    { count: totalOrders },
    { count: pendingOrders },
    { count: paidOrders },
    { count: totalUsers },
    { data: recentOrders },
    { data: topProducts }
  ] = await Promise.all([
    supabaseAdmin.from('products').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('payment_status', 'pending'),
    supabaseAdmin.from('orders').select('*', { count: 'exact', head: true }).eq('payment_status', 'paid'),
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('orders').select('*, products(name, price_usd)').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('orders').select('product_id, products(name, price_usd)').eq('payment_status', 'paid')
  ])

  const revenue = recentOrders
    ? recentOrders.filter(o => o.payment_status === 'paid').reduce((sum, o) => sum + (o.products?.price_usd || 0), 0)
    : 0

  const allPaidOrders = await supabaseAdmin
    .from('orders')
    .select('*, products(name, price_usd)')
    .eq('payment_status', 'paid')

  const totalRevenue = allPaidOrders.data
    ? allPaidOrders.data.reduce((sum, o) => sum + (o.products?.price_usd || 0), 0)
    : 0

  const productSales = {}
  if (topProducts) {
    topProducts.forEach(o => {
      const name = o.products?.name || 'Unknown'
      productSales[name] = (productSales[name] || 0) + 1
    })
  }

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().split('T')[0]
  })

  const dailySales = last7Days.map(date => {
    const count = allPaidOrders.data
      ? allPaidOrders.data.filter(o => o.created_at?.startsWith(date)).length
      : 0
    return { date: date.slice(5), count }
  })

  return NextResponse.json({
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    pendingOrders: pendingOrders || 0,
    paidOrders: paidOrders || 0,
    totalUsers: totalUsers || 0,
    totalRevenue: totalRevenue.toFixed(2),
    recentOrders: recentOrders || [],
    topProducts: Object.entries(productSales)
      .map(([name, sales]) => ({ name, sales }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5),
    dailySales
  })
}