import { supabase, supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

const WALLETS = {
  btc: 'bc1q3f8l6nfhk2x2pvdkgp730qsganj3tym5jluqv2',
  eth: '0xF9f381053FDda46b7dB6C639F2A3F6924b9dA284',
  sol: 'Apy2vqZgxDBzdGyKZLdjFzajHtSYETXZqSagqRRMWhin',
  ltc: 'LW6D6Wcn6v6rLrVRgmTpC36XqCLaqygwEz',
}

const CRYPTO_LABELS = {
  btc: 'Bitcoin (BTC)',
  eth: 'Ethereum (ETH)',
  sol: 'Solana (SOL)',
  ltc: 'Litecoin (LTC)',
}

export async function POST(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { product_id, crypto_currency } = await request.json()

  const currency = crypto_currency.toLowerCase()

  if (!WALLETS[currency]) {
    return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })
  }

  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', product_id)
    .eq('is_active', true)
    .single()

  if (productError || !product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }

  // Create order with wallet address directly
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert([{
      user_id: user.id,
      product_id: product.id,
      payment_status: 'pending',
      crypto_currency: currency,
      pay_address: WALLETS[currency],
      amount_paid: product.price_usd
    }])
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 400 })
  }

  // Get user profile for email
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email, full_name')
    .eq('id', user.id)
    .single()

  // Notify all admins by email
  const { data: admins } = await supabaseAdmin
    .from('profiles')
    .select('email')
    .eq('role', 'admin')

  if (admins && admins.length > 0) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: `orders@${process.env.NEXT_PUBLIC_DOMAIN}`,
        to: admins.map(a => a.email),
        subject: `New Order — ${product.name}`,
        html: `
          <div style="font-family:sans-serif;background:#0a0a0a;color:white;padding:32px;border-radius:12px;max-width:520px;">
            <h2 style="color:#6366f1;margin:0 0 16px;">New Payment Pending</h2>
            <p style="color:#aaa;margin:0 0 24px;">A customer has initiated a payment and is waiting for manual verification.</p>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:#666;padding:8px 0;border-bottom:1px solid #222;">Order ID</td><td style="color:white;padding:8px 0;border-bottom:1px solid #222;">${order.id.slice(0, 8).toUpperCase()}</td></tr>
              <tr><td style="color:#666;padding:8px 0;border-bottom:1px solid #222;">Product</td><td style="color:white;padding:8px 0;border-bottom:1px solid #222;">${product.name}</td></tr>
              <tr><td style="color:#666;padding:8px 0;border-bottom:1px solid #222;">Customer</td><td style="color:white;padding:8px 0;border-bottom:1px solid #222;">${profile?.email}</td></tr>
              <tr><td style="color:#666;padding:8px 0;border-bottom:1px solid #222;">Amount</td><td style="color:white;padding:8px 0;border-bottom:1px solid #222;">$${product.price_usd} USD</td></tr>
              <tr><td style="color:#666;padding:8px 0;border-bottom:1px solid #222;">Currency</td><td style="color:white;padding:8px 0;border-bottom:1px solid #222;">${CRYPTO_LABELS[currency]}</td></tr>
              <tr><td style="color:#666;padding:8px 0;">Wallet</td><td style="color:white;padding:8px 0;font-family:monospace;font-size:12px;">${WALLETS[currency]}</td></tr>
            </table>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin" style="display:inline-block;margin-top:24px;background:#6366f1;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
              Verify in Dashboard
            </a>
          </div>
        `
      })
    })
  }

  return NextResponse.json({
    order_id: order.id,
    pay_address: WALLETS[currency],
    amount_usd: product.price_usd,
    crypto_currency: currency,
    product_name: product.name,
    status: 'pending'
  })
}