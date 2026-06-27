import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gear I Use',
  description:
    'Tools, soil products, and irrigation components tested in Zone 5b raised beds over multiple seasons.',
}

const placeholderProducts = [
  {
    id: 1,
    name: 'Raised Bed Soil Mix',
    desc: 'The blend I\'ve used every season since Year 2.',
    accent: '#4A8C2A',
  },
  {
    id: 2,
    name: 'Drip Irrigation Kit',
    desc: 'Saved my garden through three dry Junes.',
    accent: '#4A8C2A',
  },
  {
    id: 3,
    name: 'Tomato Cage — Heavy Gauge',
    desc: 'The ones that don\'t fold in half by August.',
    accent: '#D4601A',
  },
  {
    id: 4,
    name: 'Soil Thermometer',
    desc: 'Non-negotiable for Zone 5b transplant timing.',
    accent: '#D4601A',
  },
]

export default function GearPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1a2535 100%)',
          padding: '5rem 0 4rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container" style={{ maxWidth: '680px' }}>
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
            Tested in Zone 5b
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              color: '#E8DFC8',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Gear I Use
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(232,223,200,0.65)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            What&apos;s actually in the garden.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ background: '#111827', padding: '3rem 0 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(232,223,200,0.6)',
              lineHeight: 1.8,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              borderLeft: '3px solid #4A8C2A',
              paddingLeft: '1.25rem',
            }}
          >
            This isn&apos;t a sponsored list. These are the tools, soil products, and
            irrigation components I&apos;ve tested in Zone 5b raised beds over multiple
            seasons. Amazon affiliate links help support the channel at no extra cost
            to you.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section style={{ background: '#111827', padding: '3rem 0 5rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="product-grid">
            {placeholderProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: '#1a2535',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderTop: `3px solid ${product.accent}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Placeholder image box */}
                <div
                  style={{
                    background: 'rgba(0,0,0,0.25)',
                    aspectRatio: '4/3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(232,223,200,0.15)"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>

                {/* Card content */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  <h3
                    style={{
                      fontSize: '1rem',
                      color: '#E8DFC8',
                      margin: 0,
                      fontFamily: 'var(--font-roboto-slab, serif)',
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(232,223,200,0.55)',
                      margin: 0,
                      lineHeight: 1.6,
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      flex: 1,
                    }}
                  >
                    {product.desc}
                  </p>
                  <span
                    style={{
                      color: 'rgba(232,223,200,0.3)',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      fontStyle: 'italic',
                      marginTop: '0.25rem',
                    }}
                  >
                    Link coming soon
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: '3rem',
              color: 'rgba(232,223,200,0.35)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontStyle: 'italic',
            }}
          >
            Full gear list with Amazon links coming in Session 8.
          </p>
        </div>
      </section>
    </>
  )
}
