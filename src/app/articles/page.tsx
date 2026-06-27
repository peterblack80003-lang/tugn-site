import type { Metadata } from 'next'
import Link from 'next/link'
import { getArticles } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Garden Articles — The Urban Gardening Neighbor',
  description:
    'Practical gardening guides based on real Zone 5b Denver experience. Each article pairs with a YouTube video so you can watch or read — whichever works for you.',
}

const laneColor: Record<string, string> = {
  A: '#D4601A',
  B: '#4A8C2A',
  C: '#8B5E3C',
}

const laneLabel: Record<string, string> = {
  A: 'Tomato Masterclass',
  B: 'Garden Systems',
  C: 'FIX IT',
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  meta_description?: string
  published_at?: string
  content_lane?: string
  series?: string
  youtube_video_id?: string
  tags?: string[]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlesPage() {
  const articles: Article[] = await getArticles().catch(() => [])

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: '#111827',
          borderBottom: '3px solid #4A8C2A',
          padding: '80px 1.5rem 5rem',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '1.25rem',
              fontWeight: 500,
            }}
          >
            Video-to-Article Library
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.1,
              color: '#E8DFC8',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontWeight: 700,
            }}
          >
            Garden Articles
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              maxWidth: '580px',
              margin: 0,
            }}
          >
            Practical gardening guides based on real Zone 5b Denver experience.
            Each article pairs with a YouTube video so you can watch or read —
            whichever works for you.
          </p>
        </div>
      </section>

      {/* ── ARTICLE GRID ── */}
      <section style={{ background: '#111827', padding: '4rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          {articles.length === 0 ? (
            /* Empty state */
            <div
              style={{
                background: '#1a2535',
                border: '1px dashed rgba(232,223,200,0.15)',
                borderRadius: '8px',
                padding: '4rem 2rem',
                textAlign: 'center',
                maxWidth: '560px',
                margin: '0 auto',
              }}
            >
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
                Coming Soon
              </p>
              <p
                style={{
                  color: 'rgba(232,223,200,0.6)',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  lineHeight: 1.7,
                  margin: '0 0 1.5rem',
                }}
              >
                Articles coming soon — check back after new videos drop.
              </p>
              <a
                href="https://youtube.com/@theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                Watch on YouTube →
              </a>
            </div>
          ) : (
            <div className="series-grid">
              {articles.map((article) => {
                const accent = article.content_lane
                  ? laneColor[article.content_lane] ?? '#4A8C2A'
                  : '#4A8C2A'
                const lane = article.content_lane
                  ? laneLabel[article.content_lane]
                  : null
                const blurb = article.excerpt || article.meta_description || ''

                return (
                  <div
                    key={article._id}
                    style={{
                      background: '#1a2535',
                      border: '1px solid rgba(232,223,200,0.07)',
                      borderTop: `3px solid ${accent}`,
                      borderRadius: '8px',
                      padding: '1.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    {/* Lane label */}
                    {lane && (
                      <p
                        style={{
                          color: accent,
                          fontSize: '10px',
                          letterSpacing: '3px',
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-inter, Inter, sans-serif)',
                          fontWeight: 700,
                          margin: 0,
                        }}
                      >
                        {lane}
                      </p>
                    )}

                    {/* Title */}
                    <h2
                      style={{
                        fontSize: '1.1rem',
                        color: '#E8DFC8',
                        margin: 0,
                        fontFamily: 'var(--font-roboto-slab, serif)',
                        fontWeight: 700,
                        lineHeight: 1.25,
                      }}
                    >
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    {blurb && (
                      <p
                        style={{
                          fontSize: '0.9rem',
                          color: 'rgba(232,223,200,0.65)',
                          lineHeight: 1.65,
                          fontFamily: 'var(--font-inter, Inter, sans-serif)',
                          margin: 0,
                          flex: 1,
                        }}
                      >
                        {blurb}
                      </p>
                    )}

                    {/* Footer row: date + link */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '0.25rem',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid rgba(232,223,200,0.06)',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {article.published_at && (
                        <span
                          style={{
                            color: 'rgba(232,223,200,0.35)',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-inter, Inter, sans-serif)',
                          }}
                        >
                          {formatDate(article.published_at)}
                        </span>
                      )}
                      <Link
                        href={`/articles/${article.slug.current}`}
                        style={{
                          color: accent,
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          fontFamily: 'var(--font-inter, Inter, sans-serif)',
                          marginLeft: 'auto',
                        }}
                      >
                        Read Article →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: '#1a3a1a',
          borderTop: '1px solid rgba(74,140,42,0.25)',
          padding: '5rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '580px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#E8DFC8',
              marginBottom: '1rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            New articles drop with every video.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '2rem',
            }}
          >
            Subscribe on YouTube for weekly gardening content from Zone 5b Denver.
          </p>
          <a
            href="https://youtube.com/@theurbangardeningneighbor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green"
          >
            Watch on YouTube
          </a>
        </div>
      </section>
    </>
  )
}
