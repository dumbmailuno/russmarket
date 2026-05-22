'use client'

import { useState, useEffect } from 'react'
import { getValidToken } from '@/app/lib/auth'

const POPPINS = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'

function usePoppins() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = POPPINS
    document.head.appendChild(link)
  }, [])
}

function Sidebar({ activePage, setPage, onLogout }) {
  const links = [
    {
      id: 'dashboard', label: 'Dashboard',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
    },
    {
      id: 'products', label: 'Products',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
    },
    {
      id: 'upload', label: 'Upload Product',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
    },
    {
      id: 'orders', label: 'Orders',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    },
    {
      id: 'categories', label: 'Categories',
      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><tag/><line x1="9" y1="9" x2="21" y2="9"/><line x1="9" y1="15" x2="21" y2="15"/><line x1="4" y1="9" x2="4" y2="9.01"/><line x1="4" y1="15" x2="4" y2="15.01"/></svg>
    },
  ]

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      borderRight: '1px solid #1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50
    }}>
      {/* Logo */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #1a1a1a',
        marginBottom: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            backgroundColor: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'white' }}>Russmarket</p>
            <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '-2px' }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, padding: '0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => setPage(link.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.7rem 0.9rem', borderRadius: '8px',
              border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
              backgroundColor: activePage === link.id ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: activePage === link.id ? '#a5b4fc' : '#666',
              fontWeight: activePage === link.id ? '600' : '400',
              fontSize: '0.875rem',
              transition: 'all 0.15s',
              fontFamily: 'Poppins, sans-serif'
            }}
          >
            <span style={{ color: activePage === link.id ? '#a5b4fc' : '#444' }}>
              {link.icon}
            </span>
            {link.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid #1a1a1a' }}>
        <a href="/" style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.7rem 0.9rem', borderRadius: '8px',
          color: '#555', fontSize: '0.875rem', marginBottom: '0.25rem',
          fontFamily: 'Poppins, sans-serif'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          View Store
        </a>
        <button
          onClick={onLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.7rem 0.9rem', borderRadius: '8px',
            border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
            backgroundColor: 'transparent', color: '#ef4444',
            fontSize: '0.875rem', fontFamily: 'Poppins, sans-serif'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{
      backgroundColor: '#111', border: '1px solid #1a1a1a',
      borderRadius: '12px', padding: '1.25rem 1.5rem'
    }}>
      <p style={{ color: '#555', fontSize: '0.78rem', fontWeight: '500',
        textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
        {label}
      </p>
      <p style={{ fontSize: '1.75rem', fontWeight: '700', color: color || 'white', marginBottom: '0.2rem' }}>
        {value}
      </p>
      {sub && <p style={{ color: '#444', fontSize: '0.75rem' }}>{sub}</p>}
    </div>
  )
}

function MiniBarChart({ data, label }) {
  const max = Math.max(...data.map(d => d.count), 1)
  return (
    <div style={{
      backgroundColor: '#111', border: '1px solid #1a1a1a',
      borderRadius: '12px', padding: '1.5rem'
    }}>
      <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{label}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
            <div style={{
              width: '100%', borderRadius: '4px 4px 0 0',
              backgroundColor: d.count > 0 ? 'var(--accent)' : '#1a1a1a',
              height: max > 0 ? (d.count / max * 100) + '%' : '4px',
              minHeight: '4px', transition: 'height 0.3s'
            }} />
            <p style={{ fontSize: '0.6rem', color: '#444', whiteSpace: 'nowrap' }}>{d.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardPage({ token }) {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/metrics', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(data => { setMetrics(data); setLoading(false) })
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh', color: '#555' }}>
      Loading metrics...
    </div>
  )

  return (
    <div>
      <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.25rem' }}>Dashboard</h1>
      <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Welcome back. Here's what's happening.
      </p>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard label="Total Revenue" value={'$' + metrics.totalRevenue} sub="All time" color="#a5b4fc" />
        <StatCard label="Total Orders" value={metrics.totalOrders} sub={metrics.pendingOrders + ' pending'} />
        <StatCard label="Paid Orders" value={metrics.paidOrders} sub="Completed" color="#4ade80" />
        <StatCard label="Products" value={metrics.totalProducts} sub="Listed" />
        <StatCard label="Users" value={metrics.totalUsers} sub="Registered" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <MiniBarChart data={metrics.dailySales} label="Sales — Last 7 Days" />

        {/* Top Products */}
        <div style={{ backgroundColor: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.5rem' }}>
          <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Top Products</p>
          {metrics.topProducts.length === 0 ? (
            <p style={{ color: '#444', fontSize: '0.8rem' }}>No sales yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {metrics.topProducts.map((p, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '150px' }}>
                    {p.name}
                  </p>
                  <span style={{
                    backgroundColor: 'rgba(99,102,241,0.15)', color: '#a5b4fc',
                    padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '600'
                  }}>
                    {p.sales} sold
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ backgroundColor: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.5rem' }}>
        <p style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '1.25rem' }}>Recent Orders</p>
        {metrics.recentOrders.length === 0 ? (
          <p style={{ color: '#444', fontSize: '0.8rem' }}>No orders yet</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {metrics.recentOrders.map(order => (
              <div key={order.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '0.75rem 1rem', backgroundColor: '#0d0d0d',
                borderRadius: '8px', border: '1px solid #1a1a1a'
              }}>
                <div>
                  <p style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '0.15rem' }}>
                    {order.products?.name || 'Unknown Product'}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#444' }}>
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#a5b4fc' }}>
                    {order.amount_paid} {order.crypto_currency?.toUpperCase()}
                  </span>
                  <span style={{
                    backgroundColor: order.payment_status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                    border: '1px solid ' + (order.payment_status === 'paid' ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)'),
                    color: order.payment_status === 'paid' ? '#4ade80' : '#facc15',
                    padding: '0.15rem 0.5rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '500'
                  }}>
                    {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ProductsPage({ token }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [filterStatus, setFilterStatus] = useState('all')
  const [editProduct, setEditProduct] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadProducts()
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories || []))
  }, [])

  const loadProducts = async () => {
    const res = await fetch('/api/products/all', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    const data = await res.json()
    setProducts(data.products || [])
    setLoading(false)
  }

  const filtered = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
      const matchStatus = filterStatus === 'all'
        ? true : filterStatus === 'active' ? p.is_active : !p.is_active
      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.created_at) - new Date(a.created_at)
      if (sortBy === 'oldest') return new Date(a.created_at) - new Date(b.created_at)
      if (sortBy === 'price_high') return b.price_usd - a.price_usd
      if (sortBy === 'price_low') return a.price_usd - b.price_usd
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return 0
    })

  const toggleActive = async (product) => {
    await fetch('/api/admin/products/' + product.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ is_active: !product.is_active })
    })
    loadProducts()
  }

  const openEdit = (product) => {
    setEditProduct(product)
    setEditForm({
      name: product.name,
      description: product.description || '',
      price_usd: product.price_usd,
      category: product.category || 'General'
    })
    setEditError('')
  }

  const saveEdit = async () => {
    setEditError('')
    if (!editForm.name || !editForm.price_usd) return setEditError('Name and price are required.')
    setEditSaving(true)

    const res = await fetch('/api/admin/products/' + editProduct.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({
        name: editForm.name,
        description: editForm.description,
        price_usd: parseFloat(editForm.price_usd),
        category: editForm.category
      })
    })

    setEditSaving(false)
    if (res.ok) { setEditProduct(null); loadProducts() }
    else { const d = await res.json(); setEditError(d.error || 'Save failed.') }
  }

  const inputStyle = {
    width: '100%', backgroundColor: '#0d0d0d',
    border: '1px solid #1a1a1a', borderRadius: '8px',
    padding: '0.7rem 1rem', color: 'white',
    fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif'
  }

  const selectStyle = {
    backgroundColor: '#111', border: '1px solid #1a1a1a',
    borderRadius: '8px', padding: '0.6rem 0.9rem',
    color: '#aaa', fontSize: '0.8rem', cursor: 'pointer',
    outline: 'none', fontFamily: 'Poppins, sans-serif'
  }

  return (
    <div>
      {/* Edit Modal */}
      {editProduct && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200, padding: '1rem'
        }}>
          <div style={{
            backgroundColor: '#111', border: '1px solid #1a1a1a',
            borderRadius: '16px', padding: '2rem', width: '100%', maxWidth: '480px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Edit Product</h2>
              <div onClick={() => setEditProduct(null)} style={{ cursor: 'pointer', color: '#555' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
            </div>

            {editError && (
              <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#f87171', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                {editError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '500', marginBottom: '0.4rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
                <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '500', marginBottom: '0.4rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '500', marginBottom: '0.4rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price (USD)</label>
                  <input type="number" value={editForm.price_usd} onChange={e => setEditForm({ ...editForm, price_usd: e.target.value })} min="0.01" step="0.01" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '500', marginBottom: '0.4rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category</label>
                  <select value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => setEditProduct(null)} style={{ flex: 1, backgroundColor: '#1a1a1a', border: 'none', color: '#aaa', borderRadius: '8px', padding: '0.75rem', fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                  Cancel
                </button>
                <button onClick={saveEdit} disabled={editSaving} style={{ flex: 1, backgroundColor: editSaving ? '#333' : 'var(--accent)', border: 'none', color: 'white', borderRadius: '8px', padding: '0.75rem', fontSize: '0.875rem', fontWeight: '600', cursor: editSaving ? 'not-allowed' : 'pointer', fontFamily: 'Poppins, sans-serif' }}>
                  {editSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.1rem' }}>Products</h1>
          <p style={{ color: '#555', fontSize: '0.875rem' }}>{filtered.length} of {products.length} products</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text" placeholder="Search products..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '2.25rem' }}
          />
        </div>

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selectStyle}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="hidden">Hidden</option>
        </select>

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price_high">Price: High to Low</option>
          <option value="price_low">Price: Low to High</option>
          <option value="name">Name A-Z</option>
        </select>
      </div>

      {loading ? (
        <p style={{ color: '#555' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed #1a1a1a', borderRadius: '12px', color: '#555' }}>
          No products found.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map(product => (
            <div key={product.id} style={{
              backgroundColor: '#111', border: '1px solid #1a1a1a',
              borderRadius: '12px', padding: '1rem 1.25rem',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '8px',
                  overflow: 'hidden', backgroundColor: '#1a1a1a',
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {product.cover_image
                    ? <img src={product.cover_image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  }
                </div>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.2rem' }}>{product.name}</p>
                  <p style={{ color: '#555', fontSize: '0.75rem' }}>
                    ${product.price_usd} · {product.category || 'General'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  backgroundColor: product.is_active ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  border: '1px solid ' + (product.is_active ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'),
                  color: product.is_active ? '#4ade80' : '#f87171',
                  padding: '0.2rem 0.6rem', borderRadius: '999px',
                  fontSize: '0.7rem', fontWeight: '500'
                }}>
                  {product.is_active ? 'Active' : 'Hidden'}
                </span>

                <button onClick={() => openEdit(product)} style={{
                  backgroundColor: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                  color: '#a5b4fc', padding: '0.35rem 0.8rem', borderRadius: '6px',
                  fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'Poppins, sans-serif'
                }}>
                  Edit
                </button>

                <button onClick={() => toggleActive(product)} style={{
                  backgroundColor: '#1a1a1a', border: '1px solid #222',
                  color: '#666', padding: '0.35rem 0.8rem', borderRadius: '6px',
                  fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'Poppins, sans-serif'
                }}>
                  {product.is_active ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function UploadPage({ token }) {
  const [form, setForm] = useState({ name: '', description: '', price_usd: '', category: '' })
  const [file, setFile] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => {
      setCategories(d.categories || [])
      if (d.categories?.length) setForm(f => ({ ...f, category: d.categories[0].name }))
    })
  }, [])

  const handleUpload = async () => {
    setError('')
    setSuccess('')
    if (!form.name || !form.description || !form.price_usd) return setError('All fields are required.')
    if (!file) return setError('Please select a file.')
    if (isNaN(parseFloat(form.price_usd)) || parseFloat(form.price_usd) <= 0) return setError('Invalid price.')

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', form.name)
    formData.append('description', form.description)
    formData.append('price_usd', form.price_usd)
    formData.append('category', form.category || 'General')
    if (coverImage) formData.append('cover_image', coverImage)

    let res, data
    try {
      res = await fetch('/api/admin/upload', {
        method: 'POST', headers: { 'Authorization': 'Bearer ' + token }, body: formData
      })
      const text = await res.text()
      if (!text) { setError('Empty response.'); setUploading(false); return }
      data = JSON.parse(text)
    } catch { setError('Something went wrong.'); setUploading(false); return }

    setUploading(false)
    if (!res.ok) { setError(data?.error || 'Upload failed.'); return }

    setSuccess('Product uploaded successfully.')
    setForm({ name: '', description: '', price_usd: '', category: categories[0]?.name || '' })
    setFile(null)
    setCoverImage(null)
  }

  const inputStyle = {
    width: '100%', backgroundColor: '#0d0d0d',
    border: '1px solid #1a1a1a', borderRadius: '8px',
    padding: '0.7rem 1rem', color: 'white',
    fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
    fontFamily: 'Poppins, sans-serif'
  }

  const labelStyle = {
    display: 'block', fontSize: '0.78rem', fontWeight: '500',
    marginBottom: '0.4rem', color: '#555',
    textTransform: 'uppercase', letterSpacing: '0.05em'
  }

  return (
    <div style={{ maxWidth: '580px' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.25rem' }}>Upload Product</h1>
      <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '2rem' }}>Add a new digital product to your store.</p>

      {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#f87171', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</div>}
      {success && <div style={{ backgroundColor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#4ade80', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{success}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={labelStyle}>Product Name</label>
          <input type="text" placeholder="e.g. Premium UI Kit" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea placeholder="Describe what the buyer gets..." value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={4} style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={labelStyle}>Price (USD)</label>
            <input type="number" placeholder="9.99" min="0.01" step="0.01" value={form.price_usd}
              onChange={e => setForm({ ...form, price_usd: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, cursor: 'pointer' }}>
              {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Product File</label>
          <div onClick={() => document.getElementById('fileInput').click()} style={{
            border: '2px dashed #1a1a1a', borderRadius: '8px', padding: '2rem',
            textAlign: 'center', cursor: 'pointer', backgroundColor: '#0d0d0d'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.75rem' }}>
              <polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/>
              <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
            </svg>
            <p style={{ color: '#555', fontSize: '0.875rem' }}>{file ? file.name : 'Click to select file'}</p>
            <p style={{ color: '#333', fontSize: '0.75rem', marginTop: '0.25rem' }}>PDF, ZIP, MP4 or any file type</p>
            <input id="fileInput" type="file" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Cover Image (optional)</label>
          <div onClick={() => document.getElementById('coverInput').click()} style={{
            border: '2px dashed #1a1a1a', borderRadius: '8px', padding: '1.5rem',
            textAlign: 'center', cursor: 'pointer', backgroundColor: '#0d0d0d'
          }}>
            {coverImage
              ? <img src={URL.createObjectURL(coverImage)} alt="Preview" style={{ maxHeight: '100px', borderRadius: '6px', objectFit: 'cover', marginBottom: '0.5rem' }} />
              : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '0.5rem' }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
            }
            <p style={{ color: '#555', fontSize: '0.875rem' }}>{coverImage ? coverImage.name : 'Click to select image'}</p>
            <input id="coverInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setCoverImage(e.target.files[0])} />
          </div>
        </div>

        <button onClick={handleUpload} disabled={uploading} style={{
          backgroundColor: uploading ? '#222' : 'var(--accent)',
          color: 'white', border: 'none', borderRadius: '8px',
          padding: '0.85rem', fontSize: '0.9rem', fontWeight: '600',
          cursor: uploading ? 'not-allowed' : 'pointer',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {uploading ? 'Uploading...' : 'Upload Product'}
        </button>
      </div>
    </div>
  )
}

function OrdersPage({ token }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetch('/api/admin/orders', {
      headers: { 'Authorization': 'Bearer ' + token }
    }).then(r => r.json()).then(d => {
      setOrders(d.orders || [])
      setLoading(false)
    })
  }, [])

  const filtered = orders.filter(o =>
    filter === 'all' ? true : o.payment_status === filter
  )

  const selectStyle = {
    backgroundColor: '#111', border: '1px solid #1a1a1a',
    borderRadius: '8px', padding: '0.6rem 0.9rem',
    color: '#aaa', fontSize: '0.8rem', cursor: 'pointer',
    outline: 'none', fontFamily: 'Poppins, sans-serif'
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.1rem' }}>Orders</h1>
          <p style={{ color: '#555', fontSize: '0.875rem' }}>{filtered.length} orders</p>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={selectStyle}>
          <option value="all">All Orders</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {loading ? <p style={{ color: '#555' }}>Loading...</p>
        : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', border: '1px dashed #1a1a1a', borderRadius: '12px', color: '#555' }}>No orders found.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map(order => (
              <div key={order.id} style={{
                backgroundColor: '#111', border: '1px solid #1a1a1a',
                borderRadius: '12px', padding: '1rem 1.25rem',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
              }}>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '0.2rem' }}>
                    #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p style={{ color: '#555', fontSize: '0.75rem' }}>
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: '600' }}>
                    {order.amount_paid} {order.crypto_currency?.toUpperCase()}
                  </span>
                  <span style={{
                    backgroundColor: order.payment_status === 'paid' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                    border: '1px solid ' + (order.payment_status === 'paid' ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)'),
                    color: order.payment_status === 'paid' ? '#4ade80' : '#facc15',
                    padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: '500'
                  }}>
                    {order.payment_status === 'paid' ? 'Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

function CategoriesPage({ token }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { loadCategories() }, [])

  const loadCategories = async () => {
    const res = await fetch('/api/admin/categories', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
    const data = await res.json()
    setCategories(data.categories || [])
    setLoading(false)
  }

  const addCategory = async () => {
    if (!newName.trim()) return setError('Please enter a category name.')
    setAdding(true)
    setError('')
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ name: newName.trim() })
    })
    setAdding(false)
    if (res.ok) { setNewName(''); loadCategories() }
    else { const d = await res.json(); setError(d.error || 'Failed to add.') }
  }

  const deleteCategory = async (id) => {
    await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ id })
    })
    loadCategories()
  }

  return (
    <div style={{ maxWidth: '560px' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.25rem' }}>Categories</h1>
      <p style={{ color: '#555', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Manage product categories. These appear as filter pills on the storefront.
      </p>

      {/* Add New */}
      <div style={{ backgroundColor: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <p style={{ fontWeight: '600', fontSize: '0.875rem', marginBottom: '1rem' }}>Add Category</p>
        {error && <div style={{ backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '0.6rem 0.9rem', color: '#f87171', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</div>}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text" placeholder="e.g. eBooks, Templates..."
            value={newName} onChange={e => setNewName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCategory()}
            style={{
              flex: 1, backgroundColor: '#0d0d0d',
              border: '1px solid #1a1a1a', borderRadius: '8px',
              padding: '0.7rem 1rem', color: 'white',
              fontSize: '0.875rem', outline: 'none',
              fontFamily: 'Poppins, sans-serif'
            }}
          />
          <button onClick={addCategory} disabled={adding} style={{
            backgroundColor: adding ? '#222' : 'var(--accent)',
            border: 'none', color: 'white', borderRadius: '8px',
            padding: '0.7rem 1.25rem', fontSize: '0.875rem',
            fontWeight: '600', cursor: adding ? 'not-allowed' : 'pointer',
            fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap'
          }}>
            {adding ? '...' : 'Add'}
          </button>
        </div>
      </div>

      {/* List */}
      {loading ? <p style={{ color: '#555' }}>Loading...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{
              backgroundColor: '#111', border: '1px solid #1a1a1a',
              borderRadius: '10px', padding: '0.85rem 1.1rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{cat.name}</span>
              </div>
              {(
                <button onClick={() => deleteCategory(cat.id)} style={{
                  background: 'none', border: 'none', color: '#444',
                  cursor: 'pointer', padding: '0.25rem',
                  display: 'flex', alignItems: 'center'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [page, setPage] = useState('dashboard')
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  usePoppins()

  useEffect(() => {
    async function init() {
      const t = await getValidToken()
      if (!t) { window.location.href = '/login'; return }
      const res = await fetch('/api/admin/check', {
        headers: { 'Authorization': 'Bearer ' + t }
      })
      if (!res.ok) { window.location.href = '/'; return }
      setToken(t)
      setLoading(false)
    }
    init()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  if (loading) return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      backgroundColor: '#0a0a0a', color: '#555',
      fontFamily: 'Poppins, sans-serif'
    }}>
      Loading...
    </div>
  )

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      backgroundColor: '#0a0a0a', color: 'white',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <Sidebar activePage={page} setPage={setPage} onLogout={handleLogout} />

      <main style={{ marginLeft: '240px', flex: 1, padding: '2rem 2.5rem', minHeight: '100vh' }}>
        {page === 'dashboard' && <DashboardPage token={token} />}
        {page === 'products' && <ProductsPage token={token} />}
        {page === 'upload' && <UploadPage token={token} />}
        {page === 'orders' && <OrdersPage token={token} />}
        {page === 'categories' && <CategoriesPage token={token} />}
      </main>
    </div>
  )
}