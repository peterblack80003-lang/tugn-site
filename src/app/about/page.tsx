import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The Urban Gardening Neighbor — real gardening from Zone 5b Denver. Built, not bought.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f1a0f 0%, #1A2535 100%)',
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
            The Urban Gardening Neighbor
          </h1>
          <p style={{ color: '#4A8C2A', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Zone 5b · Denver, CO
          </p>
        </div>
      </section>

      {/* About content */}
      <section style={{ background: 'var(--bg)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <div
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.85,
              color: 'rgba(232,223,200,0.82)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <p>
              I garden in Zone 5b Denver. I&apos;ve made most of the mistakes so you don&apos;t
              have to. This channel is the proof.
            </p>
            <p>
              TUGN is built around one idea: show the work. Not the highlight reel.
              The full season — prep, planting, the things that went wrong, and what
              actually made it to harvest.
            </p>
            <p>
              No sponsorships. No affiliate-first recommendations. No pretending that
              a $400 raised bed is the only way to grow tomatoes.
            </p>
            <p>
              The Tomato Masterclass is the flagship series — start there if you&apos;re
              new. Everything else branches off from it: soil systems, problem-solving,
              season extensions, and more.
            </p>
          </div>

          <div
            style={{
              marginTop: '3rem',
              padding: '2rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <div style={{ flex: 1, minWidth: '180px' }}>
              <h3 style={{ color: '#E8DFC8', marginBottom: '0.35rem', fontSize: '1rem' }}>
                Watch on YouTube
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(232,223,200,0.5)' }}>
                Every episode, free, no sign-in required.
              </p>
            </div>
            <a
              href="https://youtube.com/@theurbangardeningneighbor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green"
              style={{ flexShrink: 0 }}
            >
              Subscribe →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
