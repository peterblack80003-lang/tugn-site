import type { Metadata } from 'next'
import { getVideoArticles } from '@/lib/queries'
import VideoLibraryGrid from '@/components/VideoLibraryGrid'

export const metadata: Metadata = {
  title: 'Video Library — The Urban Gardening Neighbor',
  description:
    'Watch-and-read companion articles for every TUGN episode. Zone 5b Denver gardening — tomatoes, soil, systems, and problem solving.',
}

export default async function VideosPage() {
  const videos = await getVideoArticles().catch(() => [])

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: '#1A2535',
          borderBottom: '1px solid #4A8C2A',
          padding: 'clamp(40px, 7vw, 64px) 1.5rem',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.1,
              color: '#E8DFC8',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Video Library
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              maxWidth: '520px',
              margin: 0,
            }}
          >
            Every episode, organized by series. Watch, read, or both.
          </p>
        </div>
      </section>

      {/* ── FILTER + GRID (client component) ── */}
      <VideoLibraryGrid videos={videos} />

      {/* ── CTA ── */}
      <section
        style={{
          background: '#1a3a1a',
          borderTop: '1px solid rgba(74,140,42,0.25)',
          padding: '5rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '560px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
              color: '#E8DFC8',
              marginBottom: '0.85rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            New videos drop every season.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.65)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '2rem',
            }}
          >
            Subscribe on YouTube for weekly Zone 5b Denver gardening content.
          </p>
          <a
            href="https://youtube.com/@theurbangardeningneighbor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green"
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </>
  )
}
