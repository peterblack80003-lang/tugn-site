import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    'New to TUGN? Start here — find the right content for where you are in your gardening journey.',
}

const lanes = [
  {
    id: 'A',
    name: 'Tomato Masterclass',
    href: '/tomato-masterclass',
    desc: 'Start-to-finish tomato growing for Zone 5b. The flagship series.',
    accent: '#4A8C2A',
  },
  {
    id: 'B',
    name: 'Garden Systems',
    href: '/gardening-guides',
    desc: 'Soil prep, bed design, and building systems that work year after year.',
    accent: '#D4601A',
  },
  {
    id: 'C',
    name: 'Problem Solving',
    href: '/gardening-guides',
    desc: 'Pests, disease, nutrient deficiencies — what to do when things go wrong.',
    accent: '#E8DFC8',
  },
]

export default async function StartHerePage() {
  const settings = await getSiteSettings().catch(() => null)

  const headline = settings?.start_here_headline || 'Welcome to TUGN'
  const subtext =
    settings?.start_here_subtext ||
    "Pick a lane based on where you are right now. Every series is designed to be watched start-to-finish — no jumping around required."
  const featuredId = settings?.featured_episode_id
  const featuredTitle = settings?.featured_episode_title || 'Start Here'

  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #111b29 0%, #1A2535 100%)',
          paddingTop: '120px',
          paddingBottom: '60px',
          textAlign: 'center',
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
            New here?
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#E8DFC8',
              marginBottom: '1rem',
              lineHeight: 1.15,
            }}
          >
            {headline}
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
            }}
          >
            {subtext}
          </p>
        </div>
      </section>

      {/* Featured video */}
      {featuredId && (
        <section style={{ background: 'var(--surface)', padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2
              style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', color: '#E8DFC8' }}
            >
              {featuredTitle}
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
          </div>
        </section>
      )}

      {/* Content lane cards */}
      <section style={{ background: 'var(--bg)', padding: '5rem 0' }}>
        <div className="container">
          <h2
            style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              color: '#E8DFC8',
              marginBottom: '0.5rem',
            }}
          >
            Where to Start
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'rgba(232,223,200,0.5)',
              marginBottom: '2.5rem',
              fontSize: '0.95rem',
            }}
          >
            Three content lanes — pick the one that matches your situation.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {lanes.map((lane) => (
              <Link
                key={lane.id}
                href={lane.href}
                style={{
                  display: 'block',
                  background: 'var(--surface)',
                  border: `1px solid ${lane.accent}33`,
                  borderTop: `3px solid ${lane.accent}`,
                  borderRadius: '8px',
                  padding: '1.75rem',
                  transition: 'transform 0.15s',
                  textDecoration: 'none',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    background: `${lane.accent}22`,
                    color: lane.accent,
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    marginBottom: '0.75rem',
                  }}
                >
                  Lane {lane.id}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: '#E8DFC8', marginBottom: '0.6rem' }}>
                  {lane.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(232,223,200,0.6)', lineHeight: 1.6 }}>
                  {lane.desc}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '1.25rem',
                    color: lane.accent,
                    fontSize: '0.88rem',
                    fontWeight: 600,
                  }}
                >
                  Start here →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
