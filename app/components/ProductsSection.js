'use client'

import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

export default function ProductsSection({ products }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [view, setView] = useState('card')
  const [categories, setCategories] = useState(['All'])

  useEffect(() => {
    fetch('/api/categories')
      .then(r => r.json())
      .then(data => {
        const names = (data.categories || []).map(c => c.name)
        setCategories(['All', ...names])
      })
  }, [])

  const filtered = products.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || (p.category && p.category === category)
    return matchesSearch && matchesCategory
  })

  return (
    <div id="products" style={{ maxWidth: '1100px', margin: '0 auto', padding: '4rem 2rem' }}>

      {/* Header Row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>
            All Products
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Search + View Toggle */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="var(--text-muted)" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '0.6rem 1rem 0.6rem 2.25rem',
                color: 'var(--text)',
                fontSize: '0.875rem',
                outline: 'none',
                width: '220px'
              }}
            />
          </div>

          {/* View Toggle */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <button
              onClick={() => setView('card')}
              style={{
                background: view === 'card' ? 'var(--accent)' : 'none',
                border: 'none',
                padding: '0.6rem 0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={view === 'card' ? 'white' : 'var(--text-muted)'}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              style={{
                background: view === 'list' ? 'var(--accent)' : 'none',
                border: 'none',
                padding: '0.6rem 0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={view === 'list' ? 'white' : 'var(--text-muted)'}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginBottom: '2rem'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              backgroundColor: category === cat ? 'var(--accent)' : 'var(--bg-card)',
              border: '1px solid ' + (category === cat ? 'var(--accent)' : 'var(--border)'),
              color: category === cat ? 'white' : 'var(--text-muted)',
              padding: '0.35rem 1rem',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          padding: '6rem 2rem',
          border: '1px dashed var(--border)',
          borderRadius: '12px'
        }}>
          <p style={{ fontSize: '1.1rem' }}>No products found.</p>
        </div>
      ) : view === 'card' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} view="card" />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} view="list" />
          ))}
        </div>
      )}
    </div>
  )
}