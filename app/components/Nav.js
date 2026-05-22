'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <>
      <nav style={{
        borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'var(--bg-card)',
        position: 'sticky',
        top: 0,
        zIndex: 40
      }}>
        {/* Logo */}
        <a href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
          Russmarket
        </a>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}
          className="desktop-nav"
        >
          {user ? (
            <>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {user.user_metadata?.full_name || user.email}
              </span>
              <a href="/orders" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                My Orders
              </a>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Login
              </a>
              <a href="/signup" style={{
                backgroundColor: 'var(--accent)',
                color: 'white',
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                fontWeight: '500',
                fontSize: '0.95rem'
              }}>
                Sign Up
              </a>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem',
            color: 'var(--text)'
          }}
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border)',
          padding: '1rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          position: 'sticky',
          top: '57px',
          zIndex: 39
        }}
          className="mobile-menu"
        >
          {user ? (
            <>
              <div style={{
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--border)',
                marginBottom: '0.25rem'
              }}>
                <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                  {user.user_metadata?.full_name || 'Account'}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {user.email}
                </p>
              </div>
              
              <a
                href="/orders"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  padding: '0.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                My Orders
              </a>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid var(--border)',
                  color: '#f87171',
                  padding: '0.6rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.95rem',
                  padding: '0.5rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                Login
              </a>
              <a
                href="/signup"
                onClick={() => setMenuOpen(false)}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  padding: '0.7rem 1rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  textAlign: 'center'
                }}
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (min-width: 641px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  )
}