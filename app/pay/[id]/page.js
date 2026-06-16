'use client'

import { useState, useEffect, use } from 'react'
import { getValidToken } from '@/app/lib/auth'

const CRYPTO_NAMES = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  sol: 'Solana',
  ltc: 'Litecoin'
}

const CRYPTO_NETWORKS = {
  btc: 'Bitcoin Network',
  eth: 'Ethereum Network (ERC-20)',
  sol: 'Solana Network',
  ltc: 'Litecoin Network'
}

export default function PayPage({ params }) {
  const { id } = use(params)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    async function loadOrder() {
      const token = await getValidToken()
      if (!token) { window.location.href = '/login'; return }

      const res = await fetch('/api/orders/' + id, {
        headers: { 'Authorization': 'Bearer ' + token }
      })
      const data = await res.json()
      setOrder(data.order)
      setLoading(false)
    }
    loadOrder()
  }, [])

  const copy = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      Loading payment details...
    </div>
  )

  if (!order) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      Order not found.
    </div>
  )

  const isPaid = order.payment_status === 'paid'

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>

      {/* Back */}
      <a href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to store
      </a>

      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        {isPaid ? (
          /* Paid State */
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '16px', padding: '2.5rem', textAlign: 'center'
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              backgroundColor: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', color: '#22c55e' }}>
              Payment Verified
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Your payment has been confirmed. Check your email for the download link.
            </p>
          </div>
        ) : (
          /* Pending State */
          <>
            {/* Status Header */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px', padding: '2rem',
              marginBottom: '1.5rem', textAlign: 'center'
            }}>
              {/* Animated Processing Icon */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundColor: 'rgba(99,102,241,0.1)',
                border: '2px solid rgba(99,102,241,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.25rem', position: 'relative'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <style>{`
                  @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.4; }
                    50% { transform: scale(1.15); opacity: 0.1; }
                    100% { transform: scale(1); opacity: 0.4; }
                  }
                  .pulse-ring {
                    position: absolute; inset: -4px;
                    border-radius: 50%;
                    border: 2px solid rgba(99,102,241,0.4);
                    animation: pulse-ring 2s ease-in-out infinite;
                  }
                `}</style>
                <div className="pulse-ring" />
              </div>

              <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                Awaiting Payment
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.7' }}>
                Send the exact amount to the address below. Once our team confirms your transfer, your download link will be sent to your email automatically.
              </p>
            </div>

            {/* Payment Details */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                Payment Details
              </h2>

              {/* Amount */}
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Amount to send (USD equivalent)
                </p>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  backgroundColor: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '0.75rem 1rem'
                }}>
                  <span style={{ fontWeight: '700', fontSize: '1.2rem', color: '#ffffff' }}>
                    ${order.amount_paid} USD
                  </span>
                  <button
                    onClick={() => copy(order.amount_paid.toString(), 'amount')}
                    style={{ background: 'none', border: 'none', color: copied === 'amount' ? '#22c55e' : 'var(--accent)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500' }}
                  >
                    {copied === 'amount' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Currency */}
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Send using
                </p>
                <div style={{
                  backgroundColor: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '0.75rem 1rem'
                }}>
                  <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>
                    {CRYPTO_NAMES[order.crypto_currency] || order.crypto_currency?.toUpperCase()}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    — {CRYPTO_NETWORKS[order.crypto_currency]}
                  </span>
                </div>
              </div>

              {/* Address */}
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  Send to this wallet address
                </p>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  backgroundColor: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: '8px', padding: '0.75rem 1rem', gap: '1rem'
                }}>
                  <span style={{
                    fontFamily: 'monospace', fontSize: '0.8rem',
                    wordBreak: 'break-all', color: 'var(--text)'
                  }}>
                    {order.pay_address}
                  </span>
                  <button
                    onClick={() => copy(order.pay_address, 'address')}
                    style={{ background: 'none', border: 'none', color: copied === 'address' ? '#22c55e' : 'var(--accent)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', whiteSpace: 'nowrap' }}
                  >
                    {copied === 'address' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Warning */}
              <div style={{
                backgroundColor: 'rgba(99,102,241,0.05)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '8px', padding: '0.75rem 1rem',
                fontSize: '0.8rem', color: '#a5b4fc'
              }}>
                Only send {CRYPTO_NAMES[order.crypto_currency]} on the {CRYPTO_NETWORKS[order.crypto_currency]}. Sending any other asset will result in permanent loss.
              </div>
            </div>

            {/* What Happens Next */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px', padding: '2rem'
            }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem' }}>
                What happens next
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { step: '1', text: 'Send the exact USD equivalent in ' + (CRYPTO_NAMES[order.crypto_currency] || order.crypto_currency?.toUpperCase()) + ' to the address above' },
                  { step: '2', text: 'Our team receives a notification and reviews your transfer' },
                  { step: '3', text: 'Once verified, a secure download link is emailed to you instantly' },
                  { step: '4', text: 'Download link expires after 24 hours or one use' }
                ].map(item => (
                  <div key={item.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      backgroundColor: 'rgba(99,102,241,0.15)',
                      border: '1px solid rgba(99,102,241,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', fontWeight: '700', color: '#a5b4fc', flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.6', paddingTop: '0.25rem' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}