import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'
import StatsBar from '@/components/StatsBar'

const seriesCards = [
  {
    lane: 'Tomato Masterclass',
    accentColor: '#D4601A',
    borderColor: '#D4601A',
    heading: 'Six episodes. Start to harvest.',
    body: 'Timing, varieties, soil, water, pruning, harvest. Zone 5b specific. No filler.',
    cta: 'Watch the series →',
    href: '/tomato-masterclass',
  },
  {
    lane: 'Garden Systems',
    accentColor: '#4A8C2A',
    borderColor: '#4A8C2A',
    heading: 'Beds, soil, water, drip.',
    body: 'The infrastructure decisions that determine whether your garden works or doesn\'t.',
    cta: 'Build the system →',
    href: '/gardening-guides',
  },
  {
    lane: 'Fix It',
    accentColor: '#8B5E3C',
    borderColor: '#8B5E3C',
    heading: 'Something\'s wrong. Let\'s fix it.',
    body: 'Problem-first videos for when the plants aren\'t cooperating and you need answers.',
    cta: 'Find the fix →',
    href: '/videos',
  },
]

export default async function HomePage() {
  const settings = await getSiteSettings().catch(() => null)
  const featuredId = settings?.featured_episode_id

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/background.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#111827',
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(17,24,39,0.82)',
          }}
          aria-hidden="true"
        />

        {/* Hero content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            padding: '4rem 1.5rem 5rem',
            width: '100%',
            maxWidth: '720px',
            margin: '0 auto',
          }}
        >
          {/* Logo badge */}
          <div className="hero-logo-wrapper" style={{ marginBottom: '2rem' }}>
            <Image
              src="/tugn-logo-transparent.png"
              alt="The Urban Gardening Neighbor"
              fill
              sizes="(max-width: 767px) 180px, (max-width: 1023px) 240px, 300px"
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Eyebrow */}
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '1.1rem',
              fontWeight: 500,
            }}
          >
            Zone 5b · Denver
          </p>

          {/* H1 */}
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontWeight: 700,
            }}
          >
            <span style={{ color: '#E8DFC8' }}>Built.</span>
            <br />
            <span style={{ color: '#4A8C2A' }}>Not bought.</span>
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: '1.05rem',
              color: 'rgba(232,223,200,0.8)',
              lineHeight: 1.7,
              maxWidth: '540px',
              margin: '0 auto 2.25rem',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            Zone 5b raised beds, drip systems, and tomatoes that actually produce.
            Fifty videos of what I tested, what failed, and what I&apos;d do again.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/tomato-masterclass" className="btn-green">
              Watch the Series
            </Link>
            <Link href="/start-here" className="btn-outline">
              Start Here
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            opacity: 0.4,
          }}
          aria-hidden="true"
        >
          <span
            style={{
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              color: '#E8DFC8',
            }}
          >
            Scroll
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#E8DFC8">
            <path d="M8 3v10M4 9l4 4 4-4" stroke="#E8DFC8" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <StatsBar />

      {/* ── SERIES CARDS ── */}
      <section style={{ background: '#111827', padding: '5rem 0' }}>
        <div className="container">
          {/* Eyebrow */}
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              textAlign: 'center',
              marginBottom: '0.75rem',
              fontWeight: 600,
            }}
          >
            Start Here
          </p>

          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1.6rem, 3vw, 2rem)',
              color: '#E8DFC8',
              marginBottom: '3rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Where do you want to start?
          </h2>

          <div className="series-grid">
            {seriesCards.map((card) => (
              <div
                key={card.lane}
                style={{
                  background: '#1a2535',
                  border: '1px solid rgba(74,140,42,0.2)',
                  borderTop: `3px solid ${card.borderColor}`,
                  borderRadius: '8px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                <p
                  style={{
                    color: card.accentColor,
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {card.lane}
                </p>
                <h3
                  style={{
                    fontSize: '1.15rem',
                    color: '#E8DFC8',
                    margin: 0,
                    fontFamily: 'var(--font-roboto-slab, serif)',
                  }}
                >
                  {card.heading}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(232,223,200,0.65)',
                    lineHeight: 1.65,
                    margin: 0,
                    flex: 1,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  }}
                >
                  {card.body}
                </p>
                <Link
                  href={card.href}
                  style={{
                    color: card.accentColor,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    marginTop: '0.25rem',
                    transition: 'opacity 0.15s',
                  }}
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MERCH FEATURE ── */}
      <section
        style={{
          background: '#1a2535',
          borderTop: '1px solid rgba(232,223,200,0.06)',
          borderBottom: '1px solid rgba(232,223,200,0.06)',
          padding: '5rem 0',
        }}
      >
        <div className="container">
          <div className="merch-layout">
            {/* Text block */}
            <div style={{ maxWidth: '520px' }}>
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
                TUGN Merch
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: '#E8DFC8',
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-roboto-slab, serif)',
                }}
              >
                Gear and merch from the garden.
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(232,223,200,0.65)',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                }}
              >
                Stuff I&apos;d actually use or wear. Garden gear, TUGN characters, and
                print-on-demand products.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="https://the-urban-gardening-neighbor-shop.myshopify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-green"
                >
                  Visit the Shop
                </a>
                <Link href="/gear" className="btn-outline-green">
                  Gear I Use
                </Link>
              </div>
            </div>

            {/* Placeholder artwork */}
            <div
              style={{
                width: '240px',
                height: '240px',
                flexShrink: 0,
                border: '1px dashed rgba(232,223,200,0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1.5rem',
                margin: '0 auto',
              }}
            >
              <p
                style={{
                  color: 'rgba(232,223,200,0.35)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  lineHeight: 1.6,
                }}
              >
                Character artwork
                <br />
                coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED VIDEO (if set in Sanity) ── */}
      {featuredId && (
        <section style={{ background: '#111827', padding: '5rem 0' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '2rem',
                fontSize: '1.6rem',
                color: '#E8DFC8',
                fontFamily: 'var(--font-roboto-slab, serif)',
              }}
            >
              {settings?.featured_episode_title || 'Latest Episode'}
            </h2>
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
                title={settings?.featured_episode_title || 'Latest Episode'}
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
    </>
  )
}
