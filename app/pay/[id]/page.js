'use client'

import { useState, useEffect, use } from 'react'
import { getValidToken } from '@/app/lib/auth'

export default function PayPage({ params }) {
  const { id } = use(params)
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    async function loadOrder() {
      const token = await getValidToken()
      if (!token) {
        window.location.href = '/login'
        return
      }

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
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      Loading payment details...
    </div>
  )

  if (!order) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      Order not found.
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>

      {/* Back */}
      <a href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        color: 'var(--text-muted)',
        fontSize: '0.875rem',
        marginBottom: '2rem'
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        Back to store
      </a>

      <div style={{ maxWidth: '560px', margin: '0 auto' }}>

        {/* Status Header */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'rgba(234,179,8,0.1)',
            border: '1px solid rgba(234,179,8,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.4rem' }}>
            Awaiting Payment
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Send the exact amount below to complete your purchase. Your download link will be emailed to you instantly after confirmation.
          </p>
        </div>

        {/* Payment Details */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            Payment Details
          </h2>

          {/* Amount */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Amount to send
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.75rem 1rem'
            }}>
              <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                {order.amount_paid} {order.crypto_currency.toUpperCase()}
              </span>
              <button
                onClick={() => copy(order.amount_paid.toString(), 'amount')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copied === 'amount' ? '#22c55e' : 'var(--accent)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '500'
                }}
              >
                {copied === 'amount' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Address */}
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              Send to this address
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              gap: '1rem'
            }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                wordBreak: 'break-all',
                color: 'var(--text)'
              }}>
                {order.pay_address}
              </span>
              <button
                onClick={() => copy(order.pay_address, 'address')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copied === 'address' ? '#22c55e' : 'var(--accent)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}
              >
                {copied === 'address' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Network warning */}
          <div style={{
            backgroundColor: 'rgba(99,102,241,0.05)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '0.8rem',
            color: '#a5b4fc'
          }}>
            Send only {order.crypto_currency.toUpperCase()} to this address. Sending any other coin will result in permanent loss.
          </div>
        </div>

        {/* What happens next */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem'
        }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.25rem' }}>
            What happens next
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { step: '1', text: 'Send the exact amount to the address above' },
              { step: '2', text: 'NOWPayments detects your transaction on the blockchain' },
              { step: '3', text: 'Your download link is emailed to you instantly' },
              { step: '4', text: 'Link expires after 24 hours or one download' }
            ].map(item => (
              <div key={item.step} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99,102,241,0.15)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#a5b4fc',
                  flexShrink: 0
                }}>
                  {item.step}
                </div>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  paddingTop: '0.25rem'
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}