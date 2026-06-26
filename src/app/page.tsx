import Link from 'next/link'
import { getArticles, getSiteSettings } from '@/lib/queries'

function PlaceholderArticleCard() {
  return (
    <div
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
      <div style={{ height: '1rem', background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
      <div style={{ height: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: 4, width: '60%' }} />
      <div style={{ height: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: 4 }} />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>Coming soon</p>
    </div>
  )
}

export default async function HomePage() {
  const [articles, settings] = await Promise.all([
    getArticles().catch(() => []),
    getSiteSettings().catch(() => null),
  ])

  const recentArticles = articles.slice(0, 3)
  const featuredId = settings?.featured_episode_id
  const featuredTitle = settings?.featured_episode_title || 'Latest Episode'
  const featuredDesc = settings?.featured_episode_description || ''

  return (
    <>
      {/* 1. Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #111b29 0%, #1A2535 60%, #1e2d42 100%)',
          paddingTop: '120px',
          paddingBottom: '80px',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Zone 5b · Denver
          </p>
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              lineHeight: 1.1,
              color: '#E8DFC8',
              marginBottom: '1.25rem',
            }}
          >
            Built. Not bought.
          </h1>
          <p
            style={{
              fontSize: '1.15rem',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Real urban gardening — no gimmicks, no sponsorships. Just what works
            in the ground, season after season.
          </p>
          <Link href="/tomato-masterclass" className="btn-green" style={{ fontSize: '1rem' }}>
            Watch the Series
          </Link>
        </div>
      </section>

      {/* 2. Featured Episode */}
      <section style={{ background: 'var(--surface)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2
            style={{
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '1.75rem',
              color: '#E8DFC8',
            }}
          >
            {featuredId ? featuredTitle : 'New Episode Coming Soon'}
          </h2>
          {featuredId ? (
            <>
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: '#000',
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${featuredId}`}
                  title={featuredTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                />
              </div>
              {featuredDesc && (
                <p
                  style={{
                    marginTop: '1.25rem',
                    color: 'rgba(232,223,200,0.7)',
                    lineHeight: 1.7,
                    textAlign: 'center',
                  }}
                >
                  {featuredDesc}
                </p>
              )}
            </>
          ) : (
            <div
              style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '8px',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'rgba(232,223,200,0.4)',
                border: '1px dashed rgba(255,255,255,0.1)',
              }}
            >
              <p style={{ fontSize: '1rem' }}>
                New episode coming soon — subscribe on YouTube so you don&apos;t miss it.
              </p>
              <a
                href="https://youtube.com/@theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ marginTop: '1.5rem', display: 'inline-block' }}
              >
                Subscribe on YouTube
              </a>
            </div>
          )}
        </div>
      </section>

      {/* 3. Tomato Masterclass CTA */}
      <section
        style={{
          background: '#111b29',
          padding: '5rem 0',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
          <p
            style={{
              color: '#D4601A',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Free Video Series
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              color: '#E8DFC8',
              marginBottom: '1rem',
            }}
          >
            The Tomato Masterclass
          </h2>
          <p
            style={{
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              marginBottom: '2rem',
              fontSize: '1.05rem',
            }}
          >
            Start-to-finish tomato growing for Zone 5b and beyond. Soil prep,
            transplanting, pruning, disease prevention, and harvest — every step
            on camera.
          </p>
          <Link href="/tomato-masterclass" className="btn-orange">
            Start the Series →
          </Link>
        </div>
      </section>

      {/* 4. Recent Articles */}
      <section style={{ background: 'var(--bg)', padding: '5rem 0' }}>
        <div className="container">
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.75rem',
              marginBottom: '0.5rem',
              color: '#E8DFC8',
            }}
          >
            Recent Guides
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(232,223,200,0.5)',
              marginBottom: '2.5rem',
              fontSize: '0.95rem',
            }}
          >
            Written to go with the videos — not instead of them.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {recentArticles.length > 0
              ? recentArticles.map((a: { _id: string; title: string; slug?: { current: string }; meta_description?: string; published_at?: string; content_lane?: string }) => (
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
                    {a.content_lane && (
                      <span className={`lane-badge lane-badge-${a.content_lane.toLowerCase()}`}>
                        Lane {a.content_lane}
                      </span>
                    )}
                    <h3 style={{ fontSize: '1.05rem', color: '#E8DFC8', lineHeight: 1.35 }}>
                      {a.title}
                    </h3>
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
                    {a.published_at && (
                      <p style={{ fontSize: '0.78rem', color: 'rgba(232,223,200,0.35)' }}>
                        {new Date(a.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                    <Link
                      href={`/gardening-guides/${a.slug?.current}`}
                      style={{ color: '#4A8C2A', fontSize: '0.88rem', fontWeight: 600 }}
                    >
                      Read more →
                    </Link>
                  </article>
                ))
              : [0, 1, 2].map((i) => <PlaceholderArticleCard key={i} />)}
          </div>
          {recentArticles.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <Link href="/gardening-guides" className="btn-outline">
                View all guides
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 5. Email Capture */}
      <section style={{ background: '#E8DFC8', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '540px', textAlign: 'center' }}>
          <h2 style={{ color: '#1A2535', fontSize: '1.75rem', marginBottom: '0.75rem' }}>
            Get the Newsletter
          </h2>
          <p style={{ color: 'rgba(26,37,53,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Seasonal planting reminders, new video alerts, and what&apos;s actually
            happening in the garden — straight to your inbox.
          </p>
          <form
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              required
              style={{
                flex: '1 1 220px',
                padding: '0.75rem 1rem',
                border: '2px solid #1A2535',
                borderRadius: '4px',
                fontSize: '0.95rem',
                background: '#fff',
                color: '#1A2535',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                background: '#1A2535',
                color: '#E8DFC8',
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem',
                flexShrink: 0,
              }}
            >
              Subscribe
            </button>
          </form>
          <p style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'rgba(26,37,53,0.45)' }}>
            No spam. Unsubscribe any time.
          </p>
        </div>
      </section>
    </>
  )
}
