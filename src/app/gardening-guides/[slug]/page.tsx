import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getArticle, getArticles } from '@/lib/queries'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug).catch(() => null)
  if (!article) return { title: 'Article Not Found' }
  return {
    title: article.seo_title || article.title,
    description: article.meta_description,
  }
}

export async function generateStaticParams() {
  const articles = await getArticles().catch(() => [])
  return articles
    .filter((a: { slug?: { current: string } }) => a.slug?.current)
    .map((a: { slug: { current: string } }) => ({ slug: a.slug.current }))
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ lineHeight: 1.8, marginBottom: '1.25rem', color: 'rgba(232,223,200,0.85)' }}>
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        style={{
          fontSize: '1.5rem',
          color: '#E8DFC8',
          marginTop: '2.5rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-roboto-slab, serif)',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        style={{
          fontSize: '1.2rem',
          color: '#E8DFC8',
          marginTop: '2rem',
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-roboto-slab, serif)',
        }}
      >
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ color: '#E8DFC8', fontWeight: 600 }}>{children}</strong>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#4A8C2A', textDecoration: 'underline' }}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value?: { asset?: { url?: string }; alt?: string } }) =>
      value?.asset?.url ? (
        <img
          src={value.asset.url}
          alt={value.alt || ''}
          style={{ width: '100%', borderRadius: '6px', margin: '1.5rem 0' }}
        />
      ) : null,
  },
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug).catch(() => null)
  if (!article) notFound()

  return (
    <>
      {/* Header */}
      <section
        style={{
          background: 'linear-gradient(135deg, #111b29 0%, #1A2535 100%)',
          paddingTop: '120px',
          paddingBottom: '50px',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {article.content_lane && (
              <span className={`lane-badge lane-badge-${article.content_lane.toLowerCase()}`}>
                Lane {article.content_lane}
              </span>
            )}
            {article.series && (
              <span style={{ fontSize: '0.78rem', color: 'rgba(232,223,200,0.4)', fontStyle: 'italic' }}>
                {article.series}
              </span>
            )}
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.7rem, 4vw, 2.5rem)',
              color: '#E8DFC8',
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}
          >
            {article.title}
          </h1>
          {article.published_at && (
            <p style={{ fontSize: '0.82rem', color: 'rgba(232,223,200,0.4)' }}>
              {new Date(article.published_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          )}
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: 'var(--bg)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          {/* YouTube embed */}
          {article.youtube_video_id && (
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: 0,
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#000',
                marginBottom: '2.5rem',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${article.youtube_video_id}`}
                title={article.title}
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
          )}

          {/* Body text */}
          {article.body && (
            <div style={{ fontSize: '1.05rem' }}>
              <PortableText value={article.body} components={portableTextComponents} />
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid rgba(74,140,42,0.3)',
              borderRadius: '8px',
              padding: '2rem',
              marginTop: '3rem',
              textAlign: 'center',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', color: '#E8DFC8', marginBottom: '0.5rem' }}>
              Want more like this?
            </h3>
            <p style={{ color: 'rgba(232,223,200,0.6)', marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              New guides drop alongside every video episode. Subscribe to get them first.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/gardening-guides" className="btn-outline" style={{ fontSize: '0.9rem' }}>
                More guides
              </Link>
              <a
                href="https://youtube.com/@theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green"
                style={{ fontSize: '0.9rem' }}
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
