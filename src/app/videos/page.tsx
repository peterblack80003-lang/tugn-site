import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Watch all TUGN episodes on YouTube — tomatoes, soil, systems, and problem solving from Zone 5b Denver.',
}

const CHANNEL_URL = 'https://youtube.com/@theurbangardeningneighbor'
const CHANNEL_ID = 'UCg30BKGYJPyTzeVJmBmHnLg'

const placeholderVideos = [
  { id: 1, label: 'Episode 1' },
  { id: 2, label: 'Episode 2' },
  { id: 3, label: 'Episode 3' },
  { id: 4, label: 'Episode 4' },
  { id: 5, label: 'Episode 5' },
  { id: 6, label: 'Episode 6' },
]

export default function VideosPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #111b29 0%, #1A2535 100%)',
          paddingTop: '120px',
          paddingBottom: '50px',
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              color: '#E8DFC8',
              marginBottom: '0.75rem',
            }}
          >
            Videos
          </h1>
          <p
            style={{ fontSize: '1.05rem', color: 'rgba(232,223,200,0.65)', lineHeight: 1.7 }}
          >
            Every episode on one page. New videos drop with the growing season —
            subscribe so you don&apos;t miss the next one.
          </p>
        </div>
      </section>

      {/* Channel CTA */}
      <section style={{ background: 'var(--surface)', padding: '3rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ color: 'rgba(232,223,200,0.65)', marginBottom: '1.25rem', fontSize: '1rem' }}>
            Watch all episodes — and subscribe for new uploads every season.
          </p>
          <a
            href={CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green"
            style={{ fontSize: '1rem' }}
          >
            Watch All Episodes on YouTube →
          </a>
        </div>
      </section>

      {/* Channel embed */}
      <section style={{ background: 'var(--bg)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#E8DFC8', marginBottom: '1.5rem' }}>
            Latest Episodes
          </h2>
          <p style={{ color: 'rgba(232,223,200,0.4)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Dynamic video feed added in Session 8 (YouTube Data API). For now, watch directly on the channel.
          </p>

          {/* Placeholder grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {placeholderVideos.map((v) => (
              <a
                key={v.id}
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    background: 'rgba(0,0,0,0.4)',
                    aspectRatio: '16/9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div style={{ padding: '1rem' }}>
                  <p
                    style={{
                      color: 'rgba(232,223,200,0.35)',
                      fontSize: '0.85rem',
                      fontStyle: 'italic',
                    }}
                  >
                    {v.label} — coming soon
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a
              href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              View Full Channel →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
