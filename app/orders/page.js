'use client'

import { useState, useEffect } from 'react'
import { getValidToken } from '@/app/lib/auth'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadOrders() {
      const token = await getValidToken()
      if (!token) {
        window.location.href = '/login'
        return
      }

      const res = await fetch('/api/orders', {
        headers: { 'Authorization': 'Bearer ' + token }
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to load orders.')
      } else {
        setOrders(data.orders)
      }

      setLoading(false)
    }

    loadOrders()
  }, [])

  const statusColor = (status) => {
    if (status === 'paid') return '#22c55e'
    if (status === 'pending') return '#eab308'
    return 'var(--text-muted)'
  }

  const statusLabel = (status) => {
    if (status === 'paid') return 'Paid'
    if (status === 'pending') return 'Awaiting Payment'
    return status
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      Loading orders...
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

      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.4rem' }}>
            My Orders
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {orders.length} order{orders.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            color: '#f87171',
            fontSize: '0.875rem',
            marginBottom: '1.5rem'
          }}>
            {error}
          </div>
        )}

        {orders.length === 0 && !error ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem 2rem',
            border: '1px dashed var(--border)',
            borderRadius: '16px',
            color: 'var(--text-muted)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
              stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ marginBottom: '1rem' }}>
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No orders yet</p>
            <p style={{ fontSize: '0.85rem' }}>
              <a href="/" style={{ color: 'var(--accent)' }}>Browse products</a> to make your first purchase.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.map(order => (
              <div key={order.id} style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '0.95rem', marginBottom: '0.2rem' }}>
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(order.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                      Amount
                    </p>
                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                      {order.amount_paid} {order.crypto_currency?.toUpperCase()}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                      Status
                    </p>
                    <span style={{
                      backgroundColor: order.payment_status === 'paid'
                        ? 'rgba(34,197,94,0.1)'
                        : 'rgba(234,179,8,0.1)',
                      border: '1px solid ' + (order.payment_status === 'paid'
                        ? 'rgba(34,197,94,0.3)'
                        : 'rgba(234,179,8,0.3)'),
                      color: statusColor(order.payment_status),
                      padding: '0.2rem 0.6rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {statusLabel(order.payment_status)}
                    </span>
                  </div>

                  {order.payment_status === 'pending' && (
                    <a href={'/pay/' + order.id} style={{
                      backgroundColor: 'var(--accent)',
                      color: 'white',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      Complete
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}