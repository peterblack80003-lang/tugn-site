import type { Metadata } from 'next'
import { getArticles } from '@/lib/queries'
import ArticlesClient from './ArticlesClient'

export const metadata: Metadata = {
  title: 'Garden Articles — The Urban Gardening Neighbor',
  description:
    'Practical gardening guides based on real Zone 5b Denver experience. Each article pairs with a YouTube video so you can watch or read — whichever works for you.',
}

export default async function ArticlesPage() {
  const articles = await getArticles().catch(() => [])

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
        <div className="container" style={{ maxWidth: '1100px' }}>
          <ArticlesClient articles={articles} />
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
