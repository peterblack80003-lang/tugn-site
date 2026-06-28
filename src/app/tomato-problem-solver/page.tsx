import Image from 'next/image'
import { getTomatoSymptoms } from '@/lib/queries'
import SymptomGrid from './SymptomGrid'

export const metadata = {
  title: 'Tomato Problem Solver | The Urban Gardening Neighbor',
  description:
    'Identify and fix tomato problems fast. Filter by symptom category and get TUGN-tested diagnosis, solutions, and prevention tips for every common tomato issue in Zone 5b Denver.',
}

export default async function TomatoProblemSolverPage() {
  const symptoms = await getTomatoSymptoms()

  return (
    <main>
      {/* ── Hero ── */}
      <section className="page-img-hero">
        <Image
          src="/fix-it-tomato.webp"
          alt="Tomato plant in a Zone 5b Denver raised bed"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }}
          aria-hidden="true"
        />
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center',
            padding: '0 1.5rem',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontSize: 'clamp(1.75rem, 4vw, 2.8rem)',
              fontWeight: 700,
              color: '#E8DFC8',
              lineHeight: 1.1,
              marginBottom: '0.85rem',
            }}
          >
            Tomato Problem Solver
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'rgba(232,223,200,0.82)',
              lineHeight: 1.65,
              maxWidth: '500px',
              margin: 0,
            }}
          >
            Pick a symptom. Get the diagnosis. Fix it this season.
          </p>
        </div>
      </section>

      {/* ── How to use ── */}
      <section
        style={{
          background: 'rgba(74,140,42,0.06)',
          borderBottom: '1px solid rgba(74,140,42,0.15)',
          padding: '1rem 0',
        }}
      >
        <div className="container">
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            <strong style={{ color: 'var(--text)' }}>How to use:</strong>{' '}
            Filter by category (Leaves, Fruit, Roots, Stems, Growth, Pests) → click a symptom card → read the diagnosis and step-by-step fix.
          </p>
        </div>
      </section>

      {/* ── Symptom Grid ── */}
      <section style={{ padding: '2.5rem 0 5rem' }}>
        <div className="container">
          {symptoms.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'var(--text-muted)',
                border: '1px dashed var(--border)',
                borderRadius: '8px',
              }}
            >
              <p style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>No symptoms loaded yet.</p>
              <p style={{ fontSize: '0.85rem' }}>
                Run{' '}
                <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: '3px' }}>
                  node --env-file=.env scripts/seed-tomato-symptoms.js
                </code>{' '}
                to populate this page.
              </p>
            </div>
          ) : (
            <SymptomGrid symptoms={symptoms} />
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          padding: '4rem 0',
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-roboto-slab, "Roboto Slab", serif)',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: '#E8DFC8',
              marginBottom: '0.75rem',
            }}
          >
            More tomato growing resources
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            See the full raised bed setup guide, Denver planting calendar, and soil prep deep-dives — everything you need to grow great tomatoes in Zone 5b.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/raised-bed-command-center" className="btn-green">
              Raised Bed Command Center
            </a>
            <a href="/zone-5-denver-gardening-guide" className="btn-outline">
              Denver Planting Guide
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
