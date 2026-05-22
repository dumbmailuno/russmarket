import { supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { token } = await params

  // 1. Find the order with this token
  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .select('*, products(*)')
    .eq('download_token', token)
    .single()

  if (error || !order) {
    return NextResponse.json({ error: 'Invalid download link' }, { status: 404 })
  }

  // 2. Check if already used
  if (order.download_used) {
    return NextResponse.json({ error: 'This download link has already been used' }, { status: 410 })
  }

  // 3. Check if expired
  const now = new Date()
  const expires = new Date(order.download_expires_at)

  if (now > expires) {
    return NextResponse.json({ error: 'This download link has expired' }, { status: 410 })
  }

  // 4. Mark token as used
  await supabaseAdmin
    .from('orders')
    .update({ download_used: true })
    .eq('id', order.id)

  // 5. Get file from Supabase Storage and serve it
  const { data: fileData, error: fileError } = await supabaseAdmin
    .storage
    .from('products')
    .download(order.products.file_path)

  if (fileError || !fileData) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const buffer = Buffer.from(await fileData.arrayBuffer())
  const filename = order.products.file_path.split('/').pop()

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`
    }
  })
}