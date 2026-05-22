import ProductsSection from './components/ProductsSection'
import Nav from './components/Nav'

async function getProducts() {
  try {
    const { supabaseAdmin } = await import('@/app/lib/supabase')
    const { data, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
    if (error) return []
    return data || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const products = await getProducts()

  return (
    <div>
      <Nav />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #0a0a0a 100%)',
        borderBottom: '1px solid var(--border)',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '999px',
            padding: '0.35rem 1rem',
            fontSize: '0.8rem',
            color: '#a5b4fc',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em'
          }}>
            Pay with 300+ cryptocurrencies
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Premium Digital<br />Products, Instantly.
          </h1>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.15rem',
            lineHeight: '1.7',
            marginBottom: '2.5rem',
            maxWidth: '500px',
            margin: '0 auto 2.5rem'
          }}>
            Browse our collection of digital downloads. Pay with Bitcoin, Ethereum, or any crypto. Delivered to your inbox instantly.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a href="#products" style={{
              backgroundColor: 'var(--accent)',
              color: 'white',
              padding: '0.85rem 2rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              display: 'inline-block'
            }}>
              Browse Products
            </a>
            <a href="/signup" style={{
              backgroundColor: 'transparent',
              color: 'var(--text)',
              padding: '0.85rem 2rem',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1rem',
              border: '1px solid var(--border)',
              display: 'inline-block'
            }}>
              Create Account
            </a>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        flexWrap: 'wrap',
        backgroundColor: 'var(--bg-card)'
      }}>
        {[
          { value: '300+', label: 'Cryptocurrencies' },
          { value: 'Instant', label: 'Delivery' },
          { value: '24/7', label: 'Availability' },
          { value: '100%', label: 'Secure' }
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent)' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <ProductsSection products={products} />

      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.875rem'
      }}>
        <p>2026 Russmarket. All rights reserved.</p>
      </footer>
    </div>
  )
}