'use client'

import { useState, useEffect, use } from 'react'
import { getValidToken } from '@/app/lib/auth'

const CRYPTO_OPTIONS = [
  { value: 'btc', label: 'Bitcoin', symbol: 'BTC', coingecko: 'bitcoin', imgId: '1' },
  { value: 'eth', label: 'Ethereum', symbol: 'ETH', coingecko: 'ethereum', imgId: '279' },
  { value: 'sol', label: 'Solana', symbol: 'SOL', coingecko: 'solana', imgId: '4128' },
  { value: 'ltc', label: 'Litecoin', symbol: 'LTC', coingecko: 'litecoin', imgId: '2' },
  { value: 'xrp', label: 'XRP', symbol: 'XRP', coingecko: 'ripple', imgId: '44' },
  { value: 'trx', label: 'Tron', symbol: 'TRX', coingecko: 'tron', imgId: '1094' },
  { value: 'usdttrc20', label: 'Tether TRC20', symbol: 'USDT', coingecko: 'tether', imgId: '325' },
  { value: 'usdterc20', label: 'Tether ERC20', symbol: 'USDT', coingecko: 'tether', imgId: '325' },
  { value: 'usdcsol', label: 'USD Coin', symbol: 'USDC', coingecko: 'usd-coin', imgId: '6319' },
  { value: 'bnbbsc', label: 'BNB', symbol: 'BNB', coingecko: 'binancecoin', imgId: '825' },
  { value: 'matic', label: 'Polygon', symbol: 'MATIC', coingecko: 'matic-network', imgId: '4713' },
  { value: 'doge', label: 'Dogecoin', symbol: 'DOGE', coingecko: 'dogecoin', imgId: '5' },
]

function CryptoIcon({ coingecko, imgId, symbol, size = 32 }) {
  const [errored, setErrored] = useState(false)
  const url = 'https://assets.coingecko.com/coins/images/' + imgId + '/small/' + coingecko + '.png'

  if (errored) {
    return (
      <div style={{
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        backgroundColor: 'rgba(99,102,241,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.6rem',
        fontWeight: '700',
        color: '#a5b4fc',
        flexShrink: 0
      }}>
        {symbol.slice(0, 3)}
      </div>
    )
  }

  return (
    <img
      src={url}
      alt={symbol}
      onError={() => setErrored(true)}
      style={{
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        flexShrink: 0,
        objectFit: 'cover'
      }}
    />
  )
}

function CryptoDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = CRYPTO_OPTIONS.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const selectedOption = CRYPTO_OPTIONS.find(c => c.value === selected)

  return (
    <div style={{ position: 'relative' }}>

      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {selectedOption && (
            <CryptoIcon
              coingecko={selectedOption.coingecko}
              imgId={selectedOption.imgId}
              symbol={selectedOption.symbol}
              size={28}
            />
          )}
          <div>
            <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>
              {selectedOption?.symbol}
            </span>
            <span style={{
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              marginLeft: '0.5rem'
            }}>
              {selectedOption?.label}
            </span>
          </div>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="var(--text-muted)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: '0.2s',
            flexShrink: 0
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          zIndex: 50,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
        }}>

          {/* Search */}
          <div style={{
            padding: '0.75rem',
            borderBottom: '1px solid var(--border)'
          }}>
            <input
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                backgroundColor: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '0.5rem 0.75rem',
                color: 'var(--text)',
                fontSize: '0.875rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Options */}
          <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{
                padding: '1rem',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
              }}>
                No results found
              </div>
            ) : (
              filtered.map(crypto => (
                <div
                  key={crypto.value}
                  onClick={() => {
                    onSelect(crypto.value)
                    setOpen(false)
                    setSearch('')
                  }}
                  style={{
                    padding: '0.65rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    backgroundColor: selected === crypto.value
                      ? 'rgba(99,102,241,0.08)'
                      : 'transparent',
                    borderLeft: selected === crypto.value
                      ? '2px solid var(--accent)'
                      : '2px solid transparent',
                    transition: 'background 0.1s'
                  }}
                >
                  <CryptoIcon
                    coingecko={crypto.coingecko}
                    imgId={crypto.imgId}
                    symbol={crypto.symbol}
                    size={32}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      marginBottom: '0.1rem'
                    }}>
                      {crypto.symbol}
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      {crypto.label}
                    </p>
                  </div>
                  {selected === crypto.value && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="#6366f1" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ProductPage({ params }) {
  const { id } = use(params)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCrypto, setSelectedCrypto] = useState('btc')
  const [buying, setBuying] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))

    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        const found = data.products.find(p => p.id === id)
        setProduct(found || null)
        setLoading(false)
      })
  }, [])

  const handleBuy = async () => {
    if (!user) {
      window.location.href = '/login'
      return
    }

    setBuying(true)
    setError('')

    const token = await getValidToken()

    if (!token) {
      window.location.href = '/login'
      return
    }

    let res, data

    try {
      res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          product_id: product.id,
          crypto_currency: selectedCrypto
        })
      })

      const text = await res.text()

      if (!text) {
        setError('Server returned an empty response. Please try again.')
        setBuying(false)
        return
      }

      data = JSON.parse(text)

    } catch (err) {
      setError('Something went wrong. Please try again.')
      setBuying(false)
      return
    }

    setBuying(false)

    if (!res.ok) {
      setError(data?.error || 'Payment failed. Please try again.')
      return
    }

    window.location.href = '/pay/' + data.order_id
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      Loading...
    </div>
  )

  if (!product) return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-muted)'
    }}>
      Product not found.
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
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to store
      </a>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        alignItems: 'start'
      }}>

        {/* Left — Product Info */}
        <div>
          <div style={{
            borderRadius: '16px',
            height: '280px',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid var(--border)',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {product.cover_image ? (
              <img
                src={product.cover_image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none"
                stroke="#4f46e5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            )}
          </div>

          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '999px',
            padding: '0.2rem 0.75rem',
            fontSize: '0.75rem',
            color: '#a5b4fc',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Digital Download
          </div>

          <h1 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            marginBottom: '1rem',
            lineHeight: '1.3'
          }}>
            {product.name}
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            lineHeight: '1.7',
            fontSize: '0.95rem'
          }}>
            {product.description}
          </p>

          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}>
            {[
              'Instant delivery to your email',
              'Secure one-time download link',
              'Pay with 300+ cryptocurrencies'
            ].map(item => (
              <div key={item} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.875rem',
                color: 'var(--text-muted)'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Purchase Box */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          position: 'sticky',
          top: '2rem'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '0.25rem'
          }}>
            ${product.price_usd}
          </div>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            marginBottom: '1.75rem'
          }}>
            One-time payment
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--text-muted)',
              marginBottom: '0.75rem'
            }}>
              Pay with
            </label>
            <CryptoDropdown
              selected={selectedCrypto}
              onSelect={setSelectedCrypto}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#f87171',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleBuy}
            disabled={buying}
            style={{
              width: '100%',
              backgroundColor: buying ? 'var(--border)' : 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: buying ? 'not-allowed' : 'pointer',
              marginBottom: '1rem'
            }}
          >
            {buying ? 'Creating payment...' : user ? 'Buy Now' : 'Login to Purchase'}
          </button>

          <p style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            Secured by NOWPayments. No chargebacks.
          </p>
        </div>
      </div>
    </div>
  )
}