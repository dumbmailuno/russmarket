import { supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('x-nowpayments-sig')

  // 1. Verify the webhook is really from NOWPayments
  const hmac = crypto
    .createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET)
    .update(JSON.stringify(JSON.parse(body)))
    .digest('hex')

  if (hmac !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const payment = JSON.parse(body)

  // 2. Only act on confirmed payments
  if (payment.payment_status !== 'finished') {
    return NextResponse.json({ received: true })
  }

  // 3. Find the order
  const { data: order } = await supabaseAdmin
    .from('orders')
    .select('*, products(*)')
    .eq('payment_id', payment.payment_id)
    .single()

  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // 4. Generate a secure download token
  const downloadToken = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

  // 5. Update order as paid
  await supabaseAdmin
    .from('orders')
    .update({
      payment_status: 'paid',
      download_token: downloadToken,
      download_expires_at: expiresAt.toISOString()
    })
    .eq('id', order.id)

  // 6. Get user email
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email')
    .eq('id', order.user_id)
    .single()

  // 7. Send download email
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'onboarding@resend.dev',
      to: profile.email,
      subject: `Your download is ready — ${order.products.name}`,
      html: `
        <h2>Payment confirmed!</h2>
        <p>Thank you for your purchase of <strong>${order.products.name}</strong>.</p>
        <p>Click the link below to download your file. It expires in 24 hours.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/download/${downloadToken}">
          Download Now
        </a>
      `
    })
  })

  return NextResponse.json({ received: true })
}