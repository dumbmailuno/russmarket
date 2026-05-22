import { supabase, supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request) {
  // 1. Check user is logged in
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)

  if (authError || !user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  // 2. Get the product they want to buy
  const { product_id, crypto_currency } = await request.json()

  if (!product_id || !crypto_currency) {
    return NextResponse.json({ error: 'product_id and crypto_currency are required' }, { status: 400 })
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

  // 3. Create payment with NOWPayments
  const paymentResponse = await fetch('https://api.nowpayments.io/v1/payment', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NOWPAYMENTS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      price_amount: product.price_usd,
      price_currency: 'usd',
      pay_currency: crypto_currency.toLowerCase(),
      order_id: product_id,
      order_description: product.name
    })
  })

  const payment = await paymentResponse.json()

  if (!paymentResponse.ok) {
    return NextResponse.json({ error: payment.message || 'Payment creation failed' }, { status: 400 })
  }

  // 4. Save order to database
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert([{
      user_id: user.id,
      product_id: product.id,
      payment_id: payment.payment_id,
      payment_status: 'pending',
      crypto_currency: crypto_currency.toLowerCase(),
      amount_paid: payment.pay_amount,
      pay_address: payment.pay_address
    }])
    .select()
    .single()

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 400 })
  }

  // 5. Return payment details to user
  return NextResponse.json({
    order_id: order.id,
    payment_id: payment.payment_id,
    pay_address: payment.pay_address,
    pay_amount: payment.pay_amount,
    pay_currency: payment.pay_currency,
    status: payment.payment_status
  })
}