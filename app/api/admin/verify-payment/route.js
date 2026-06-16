import { supabase, supabaseAdmin } from '@/app/lib/supabase'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Admins only' }, { status: 403 })
  }

  const { order_id } = await request.json()

  // Get order with product and user info
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .select('*, products(*)')
    .eq('id', order_id)
    .single()

  if (orderError || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  if (order.payment_status === 'paid') {
    return NextResponse.json({ error: 'Order already verified' }, { status: 400 })
  }

  // Generate secure download token
  const downloadToken = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

  // Update order to paid
  await supabaseAdmin
    .from('orders')
    .update({
      payment_status: 'paid',
      download_token: downloadToken,
      download_expires_at: expiresAt.toISOString()
    })
    .eq('id', order_id)

  // Get buyer email
  const { data: buyerProfile } = await supabaseAdmin
    .from('profiles')
    .select('email, full_name')
    .eq('id', order.user_id)
    .single()

  // Send download email to buyer
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: `orders@${process.env.NEXT_PUBLIC_DOMAIN}`,
      to: buyerProfile.email,
      subject: `Your download is ready — ${order.products.name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background-color:#111111;border-radius:16px;border:1px solid #222222;overflow:hidden;max-width:560px;width:100%;">
                  <tr>
                    <td style="padding:40px;">
                      <h2 style="color:#22c55e;font-size:20px;font-weight:700;margin:0 0 8px;">Payment Verified</h2>
                      <h3 style="color:#ffffff;font-size:16px;font-weight:600;margin:0 0 16px;">${order.products.name}</h3>
                      <p style="color:#888;font-size:15px;line-height:1.7;margin:0 0 24px;">
                        Your payment has been verified. Click the button below to download your file. This link expires in 24 hours and can only be used once.
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding:8px 0 32px;">
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/download/${downloadToken}"
                              style="display:inline-block;background-color:#6366f1;color:#ffffff;font-weight:600;font-size:15px;text-decoration:none;padding:14px 36px;border-radius:8px;">
                              Download Now
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="color:#555;font-size:12px;margin:0;">
                        If the button doesn't work, copy this link:<br/>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}/api/download/${downloadToken}" style="color:#6366f1;font-size:11px;word-break:break-all;">
                          ${process.env.NEXT_PUBLIC_APP_URL}/api/download/${downloadToken}
                        </a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color:#0d0d0d;padding:24px 40px;border-top:1px solid #1a1a1a;text-align:center;">
                      <p style="color:#444;font-size:12px;margin:0;">
                        Thank you for your purchase at
                        <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color:#6366f1;text-decoration:none;">Russmarket</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    })
  })

  return NextResponse.json({ ok: true, message: 'Payment verified and download email sent.' })
}