import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Gardening Guides',
  description:
    'Practical gardening guides covering tomatoes, soil, systems, and troubleshooting — built around the TUGN video series.',
}

const filterTabs = ['All', 'Tomatoes', 'Soil', 'Systems', 'Troubleshooting']

export default async function GardeningGuidesPage() {
  const articles = await getArticles().catch(() => [])

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
            Gardening Guides
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(232,223,200,0.65)', lineHeight: 1.7 }}>
            Written to go alongside the videos. Every guide maps to an episode so
            you can reread the key steps without re-watching.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0' }}>
        <div className="container" style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              style={{
                background: 'none',
                border: 'none',
                padding: '1rem 1.25rem',
                color: tab === 'All' ? '#4A8C2A' : 'rgba(232,223,200,0.55)',
                fontWeight: tab === 'All' ? 600 : 400,
                borderBottom: tab === 'All' ? '2px solid #4A8C2A' : '2px solid transparent',
                cursor: 'pointer',
                fontSize: '0.9rem',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Article grid */}
      <section style={{ background: 'var(--bg)', padding: '4rem 0' }}>
        <div className="container">
          {articles.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {articles.map(
                (a: {
                  _id: string
                  title: string
                  slug?: { current: string }
                  meta_description?: string
                  published_at?: string
                  content_lane?: string
                  series?: string
                }) => (
                  <article
                    key={a._id}
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {a.content_lane && (
                        <span
                          className={`lane-badge lane-badge-${a.content_lane.toLowerCase()}`}
                        >
                          Lane {a.content_lane}
                        </span>
                      )}
                      {a.series && (
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: 'rgba(232,223,200,0.4)',
                            fontStyle: 'italic',
                          }}
                        >
                          {a.series}
                        </span>
                      )}
                    </div>
                    <h2
                      style={{
                        fontSize: '1.05rem',
                        color: '#E8DFC8',
                        lineHeight: 1.35,
                        fontFamily: 'var(--font-roboto-slab, serif)',
                      }}
                    >
                      {a.title}
                    </h2>
                    {a.meta_description && (
                      <p
                        style={{
                          fontSize: '0.88rem',
                          color: 'rgba(232,223,200,0.6)',
                          lineHeight: 1.6,
                          flex: 1,
                        }}
                      >
                        {a.meta_description}
                      </p>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'auto',
                      }}
                    >
                      {a.published_at && (
                        <span style={{ fontSize: '0.75rem', color: 'rgba(232,223,200,0.35)' }}>
                          {new Date(a.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                      <Link
                        href={`/gardening-guides/${a.slug?.current}`}
                        style={{ color: '#4A8C2A', fontSize: '0.88rem', fontWeight: 600 }}
                      >
                        Read more →
                      </Link>
                    </div>
                  </article>
                )
              )}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '5rem 2rem',
                color: 'rgba(232,223,200,0.4)',
              }}
            >
              <h2 style={{ fontSize: '1.4rem', color: '#E8DFC8', marginBottom: '0.75rem' }}>
                Guides Coming Soon
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                Check back after each new video — written guides drop alongside every episode.
              </p>
              <a
                href="https://youtube.com/@theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green"
                style={{ marginTop: '1.75rem', display: 'inline-block' }}
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
