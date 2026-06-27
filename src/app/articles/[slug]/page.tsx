import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { getArticle } from '@/lib/queries'

type Props = { params: Promise<{ slug: string }> }

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug).catch(() => null)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.seo_title || article.title,
    description: article.meta_description || article.excerpt,
  }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p
        style={{
          fontSize: '1rem',
          color: 'rgba(232,223,200,0.82)',
          lineHeight: 1.85,
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          margin: '0 0 1.25rem',
        }}
      >
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: 'clamp(1.3rem, 3vw, 1.65rem)',
          color: '#E8DFC8',
          fontFamily: 'var(--font-roboto-slab, serif)',
          fontWeight: 700,
          margin: '2.5rem 0 0.85rem',
          lineHeight: 1.2,
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
          color: '#E8DFC8',
          fontFamily: 'var(--font-roboto-slab, serif)',
          fontWeight: 700,
          margin: '2rem 0 0.65rem',
          lineHeight: 1.25,
        }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: '3px solid #4A8C2A',
          paddingLeft: '1.25rem',
          margin: '1.75rem 0',
          color: 'rgba(232,223,200,0.7)',
          fontStyle: 'italic',
          fontSize: '1rem',
          lineHeight: 1.7,
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ color: '#E8DFC8', fontWeight: 600 }}>{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith('http') ? '_blank' : undefined}
        rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        style={{ color: '#4A8C2A', textDecoration: 'underline', textDecorationColor: 'rgba(74,140,42,0.4)' }}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        style={{
          margin: '0 0 1.25rem 1.25rem',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        style={{
          margin: '0 0 1.25rem 1.25rem',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
        }}
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        style={{
          fontSize: '1rem',
          color: 'rgba(232,223,200,0.82)',
          lineHeight: 1.7,
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          listStyleType: 'disc',
        }}
      >
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li
        style={{
          fontSize: '1rem',
          color: 'rgba(232,223,200,0.82)',
          lineHeight: 1.7,
          fontFamily: 'var(--font-inter, Inter, sans-serif)',
          listStyleType: 'decimal',
        }}
      >
        {children}
      </li>
    ),
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug).catch(() => null)

  /* ── NOT FOUND ── */
  if (!article) {
    return (
      <section style={{ background: '#111827', padding: '8rem 1.5rem', minHeight: '60vh' }}>
        <div className="container" style={{ maxWidth: '560px', textAlign: 'center' }}>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            404
          </p>
          <h1
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
              color: '#E8DFC8',
              fontFamily: 'var(--font-roboto-slab, serif)',
              marginBottom: '1rem',
            }}
          >
            Article not found.
          </h1>
          <p
            style={{
              color: 'rgba(232,223,200,0.6)',
              fontSize: '1rem',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '2rem',
            }}
          >
            This article may not be published yet, or the URL might be off.
          </p>
          <Link href="/articles" className="btn-outline">
            ← Back to Articles
          </Link>
        </div>
      </section>
    )
  }

  const accent = article.content_lane ? laneColor[article.content_lane] ?? '#4A8C2A' : '#4A8C2A'
  const lane = article.content_lane ? laneLabel[article.content_lane] : null

  return (
    <>
      {/* ── ARTICLE HEADER ── */}
      <section
        style={{
          background: '#111827',
          borderBottom: `3px solid ${accent}`,
          padding: '64px 1.5rem 4rem',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          {/* Back link */}
          <Link
            href="/articles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              color: 'rgba(232,223,200,0.4)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '1.75rem',
            }}
          >
            ← All Articles
          </Link>

          {/* Lane label */}
          {lane && (
            <p
              style={{
                color: accent,
                fontSize: '11px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontWeight: 700,
                marginBottom: '0.85rem',
              }}
            >
              {lane}
            </p>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.12,
              color: '#E8DFC8',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontWeight: 700,
            }}
          >
            {article.title}
          </h1>

          {/* Meta row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {article.published_at && (
              <span
                style={{
                  color: 'rgba(232,223,200,0.4)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                }}
              >
                {formatDate(article.published_at)}
              </span>
            )}
            {article.tags && article.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {article.tags.map((tag: string) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(74,140,42,0.12)',
                      color: '#4A8C2A',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '3px',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── VIDEO EMBED ── */}
      {article.youtube_video_id && (
        <section style={{ background: '#0d1420', padding: '3rem 1.5rem' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
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
                src={`https://www.youtube.com/embed/${article.youtube_video_id}`}
                title={article.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
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
          </div>
        </section>
      )}

      {/* ── ARTICLE BODY ── */}
      <section style={{ background: '#111827', padding: '4rem 1.5rem 5rem' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          {/* Excerpt */}
          {article.excerpt && (
            <p
              style={{
                fontSize: '1.1rem',
                color: 'rgba(232,223,200,0.8)',
                lineHeight: 1.75,
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                borderLeft: `3px solid ${accent}`,
                paddingLeft: '1.25rem',
                marginBottom: '2.5rem',
                fontStyle: 'italic',
              }}
            >
              {article.excerpt}
            </p>
          )}

          {/* Body */}
          {article.body && article.body.length > 0 ? (
            <div>
              <PortableText value={article.body} components={portableTextComponents} />
            </div>
          ) : (
            <p
              style={{
                color: 'rgba(232,223,200,0.4)',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontStyle: 'italic',
              }}
            >
              Article body coming soon.
            </p>
          )}

          {/* Back link */}
          <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(232,223,200,0.07)' }}>
            <Link
              href="/articles"
              style={{
                color: 'rgba(232,223,200,0.5)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
              }}
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: '#1a3a1a',
          borderTop: '1px solid rgba(74,140,42,0.25)',
          padding: '4rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '560px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
              color: '#E8DFC8',
              marginBottom: '0.85rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Watch the video version on YouTube.
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'rgba(232,223,200,0.65)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '1.75rem',
            }}
          >
            Weekly proof-first gardening content from Zone 5b Denver.
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
