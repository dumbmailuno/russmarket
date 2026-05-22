'use client'

export default function ProductCard({ product, view }) {
  if (view === 'list') {
    return (
      <a
        href={'/products/' + product.id}
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          padding: '1rem 1.25rem',
          transition: 'border-color 0.2s'
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '10px',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--border)'
        }}>
          {product.cover_image ? (
            <img
              src={product.cover_image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontWeight: '600',
            fontSize: '0.95rem',
            marginBottom: '0.25rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.name}
          </p>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {product.description}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          {product.category && (
            <span style={{
              backgroundColor: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              color: '#a5b4fc',
              padding: '0.2rem 0.6rem',
              borderRadius: '999px',
              fontSize: '0.7rem',
              fontWeight: '500'
            }}>
              {product.category}
            </span>
          )}
          <span style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#ffffff'
          }}>
            ${product.price_usd}
          </span>
          <span style={{
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.35rem 0.9rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: '500',
            whiteSpace: 'nowrap'
          }}>
            Buy Now
          </span>
        </div>
      </a>
    )
  }

  return (
    <a
      href={'/products/' + product.id}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'block',
        transition: 'transform 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {product.cover_image ? (
          <img
            src={product.cover_image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
            stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        )}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          backgroundColor: 'rgba(99,102,241,0.15)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '999px',
          padding: '0.2rem 0.6rem',
          fontSize: '0.7rem',
          color: '#a5b4fc',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          {product.category || 'Digital Download'}
        </div>
      </div>

      <div style={{ padding: '1.25rem' }}>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '0.4rem',
          color: 'var(--text)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {product.name}
        </h3>
        <p style={{
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          marginBottom: '1.25rem',
          lineHeight: '1.6',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.description}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: '#ffffff'
          }}>
            ${product.price_usd}
          </span>
          <span style={{
            backgroundColor: 'var(--accent)',
            color: 'white',
            padding: '0.35rem 0.9rem',
            borderRadius: '6px',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}>
            Buy Now
          </span>
        </div>
      </div>
    </a>
  )
}