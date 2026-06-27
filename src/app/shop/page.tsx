import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop — TUGN Merch',
  description:
    'TUGN characters, garden gear, and print-on-demand products from The Urban Gardening Neighbor.',
}

const SHOP_URL = 'https://the-urban-gardening-neighbor-shop.myshopify.com'

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f1a0f 0%, #111827 100%)',
          padding: '5rem 0 4rem',
          borderBottom: '1px solid rgba(74,140,42,0.15)',
        }}
      >
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            TUGN Merch
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: '#E8DFC8',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            TUGN Merch
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(232,223,200,0.65)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            Characters, garden gear, and print-on-demand products.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ background: '#111827', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(232,223,200,0.75)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              textAlign: 'center',
            }}
          >
            The TUGN character universe — Earl, Walt, Pip, Vera, and the crew — on
            apparel, mugs, and garden gear. All printed on demand via Printful.
          </p>

          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green"
              style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}
            >
              Browse the Shop →
            </a>
          </div>

          {/* Character lineup placeholder */}
          <div
            style={{
              background: '#1a2535',
              border: '1px solid rgba(232,223,200,0.08)',
              borderTop: '3px solid #4A8C2A',
              borderRadius: '8px',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                color: '#4A8C2A',
                fontSize: '10px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontWeight: 600,
                marginBottom: '1rem',
              }}
            >
              Coming Soon
            </p>
            <h2
              style={{
                fontSize: '1.4rem',
                color: '#E8DFC8',
                marginBottom: '0.75rem',
                fontFamily: 'var(--font-roboto-slab, serif)',
              }}
            >
              Character merch lineup coming soon.
            </h2>
            <p
              style={{
                fontSize: '0.92rem',
                color: 'rgba(232,223,200,0.5)',
                lineHeight: 1.7,
                maxWidth: '480px',
                margin: '0 auto 1.75rem',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
              }}
            >
              Earl the seed-starting owl, Walt the wiggly worm, Pip the pepper plant —
              the full crew is being drawn. Check back each season.
            </p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-green"
              style={{ fontSize: '0.9rem' }}
            >
              Visit Shop Now →
            </a>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              href="/gear"
              style={{
                color: 'rgba(232,223,200,0.5)',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
              }}
            >
              Looking for gear I actually use? → Gear I Use
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
