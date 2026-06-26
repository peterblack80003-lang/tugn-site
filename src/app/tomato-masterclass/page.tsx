import type { Metadata } from 'next'
import Link from 'next/link'
import { getEpisodesBySeries, getArticles } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Tomato Masterclass',
  description:
    'A complete video series on growing tomatoes in Zone 5b Denver — from soil prep to harvest.',
}

export default async function TomatoMasterclassPage() {
  const [episodes, allArticles] = await Promise.all([
    getEpisodesBySeries('Tomato Masterclass').catch(() => []),
    getArticles().catch(() => []),
  ])

  const laneAArticles = allArticles.filter(
    (a: { content_lane?: string }) => a.content_lane === 'A'
  ).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f1a0f 0%, #1A2535 100%)',
          paddingTop: '120px',
          paddingBottom: '60px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(74,140,42,0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '680px' }}>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Lane A · Free Video Series
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#E8DFC8',
              marginBottom: '1rem',
              lineHeight: 1.15,
            }}
          >
            The Tomato Masterclass
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
            }}
          >
            Every step of growing tomatoes in Zone 5b — on camera, in real time,
            with real mistakes and real results.
          </p>
        </div>
      </section>

      {/* Episode list */}
      <section style={{ background: 'var(--bg)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              color: '#E8DFC8',
              marginBottom: '2rem',
            }}
          >
            Episodes
          </h2>

          {episodes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {episodes.map(
                (
                  ep: {
                    _id: string
                    title: string
                    youtube_id: string
                    description?: string
                    thumbnail_url?: string
                    published_at?: string
                  },
                  idx: number
                ) => (
                  <div
                    key={ep._id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr',
                      gap: '1.5rem',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      overflow: 'hidden',
                    }}
                  >
                    <a
                      href={`https://www.youtube.com/watch?v=${ep.youtube_id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', flexShrink: 0 }}
                    >
                      <img
                        src={
                          ep.thumbnail_url ||
                          `https://img.youtube.com/vi/${ep.youtube_id}/mqdefault.jpg`
                        }
                        alt={ep.title}
                        style={{ width: '100%', height: '112px', objectFit: 'cover' }}
                      />
                    </a>
                    <div style={{ padding: '1.25rem 1.25rem 1.25rem 0' }}>
                      <p
                        style={{
                          fontSize: '0.72rem',
                          color: 'rgba(232,223,200,0.4)',
                          marginBottom: '0.35rem',
                        }}
                      >
                        Episode {idx + 1}
                      </p>
                      <h3 style={{ fontSize: '1rem', color: '#E8DFC8', marginBottom: '0.5rem' }}>
                        {ep.title}
                      </h3>
                      {ep.description && (
                        <p
                          style={{
                            fontSize: '0.85rem',
                            color: 'rgba(232,223,200,0.6)',
                            lineHeight: 1.6,
                            marginBottom: '0.75rem',
                          }}
                        >
                          {ep.description.slice(0, 140)}
                          {ep.description.length > 140 ? '…' : ''}
                        </p>
                      )}
                      <a
                        href={`https://www.youtube.com/watch?v=${ep.youtube_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-green"
                        style={{ fontSize: '0.82rem', padding: '0.5rem 1.1rem' }}
                      >
                        Watch →
                      </a>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              style={{
                background: 'var(--surface)',
                border: '1px dashed rgba(255,255,255,0.1)',
                borderRadius: '8px',
                padding: '4rem 2rem',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'rgba(232,223,200,0.4)', fontSize: '1rem' }}>
                Episodes coming soon — subscribe on YouTube so you don&apos;t miss the first one.
              </p>
              <a
                href="https://youtube.com/@theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green"
                style={{ marginTop: '1.5rem', display: 'inline-block' }}
              >
                Subscribe on YouTube
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Related articles */}
      {laneAArticles.length > 0 && (
        <section style={{ background: 'var(--surface)', padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#E8DFC8', marginBottom: '1.5rem' }}>
              Related Guides
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {laneAArticles.map(
                (a: {
                  _id: string
                  title: string
                  slug?: { current: string }
                  meta_description?: string
                }) => (
                  <Link
                    key={a._id}
                    href={`/gardening-guides/${a.slug?.current}`}
                    style={{
                      display: 'block',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      textDecoration: 'none',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '0.95rem',
                        color: '#E8DFC8',
                        marginBottom: '0.5rem',
                        lineHeight: 1.35,
                      }}
                    >
                      {a.title}
                    </h3>
                    {a.meta_description && (
                      <p
                        style={{
                          fontSize: '0.82rem',
                          color: 'rgba(232,223,200,0.55)',
                          lineHeight: 1.5,
                        }}
                      >
                        {a.meta_description.slice(0, 100)}…
                      </p>
                    )}
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '0.75rem',
                        color: '#4A8C2A',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                      }}
                    >
                      Read →
                    </span>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
