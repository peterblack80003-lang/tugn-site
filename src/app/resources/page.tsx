import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Recommended tools, products, and resources from The Urban Gardening Neighbor.',
}

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #111b29 0%, #1A2535 100%)',
          paddingTop: '120px',
          paddingBottom: '60px',
        }}
      >
        <div className="container" style={{ maxWidth: '680px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              color: '#E8DFC8',
              marginBottom: '0.75rem',
            }}
          >
            Resources
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(232,223,200,0.65)', lineHeight: 1.7 }}>
            Recommended tools, products, and resources coming soon.
          </p>
        </div>
      </section>

      {/* Placeholder */}
      <section style={{ background: 'var(--bg)', padding: '6rem 0' }}>
        <div
          className="container"
          style={{
            maxWidth: '600px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '1px dashed rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '4rem 2rem',
            }}
          >
            <h2 style={{ fontSize: '1.4rem', color: '#E8DFC8', marginBottom: '0.75rem' }}>
              Coming in Session 8
            </h2>
            <p
              style={{
                color: 'rgba(232,223,200,0.55)',
                lineHeight: 1.7,
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
              }}
            >
              Affiliate links, recommended gear, and seed sources — curated from
              what actually gets used in the TUGN garden.
            </p>
            <a
              href="https://youtube.com/@theurbangardeningneighbor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Watch the channel →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
