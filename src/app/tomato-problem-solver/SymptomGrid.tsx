'use client'

import { useState, useEffect, useCallback } from 'react'
import { PortableText } from '@portabletext/react'

const CATEGORIES = ['All', 'Leaves', 'Fruit', 'Roots', 'Stems', 'Growth', 'Pests']

const SEVERITY_COLOR: Record<string, string> = {
  Low: '#4A8C2A',
  Medium: '#D4601A',
  High: '#e05252',
}

type Symptom = {
  _id: string
  symptomName: string
  category: string
  shortDescription: string
  diagnosis: unknown[]
  solution: unknown[]
  preventionTip: string | null
  relatedVideo: string | null
  severity: string
  infographicUrl: string | null
}

export default function SymptomGrid({ symptoms }: { symptoms: Symptom[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [open, setOpen] = useState<Symptom | null>(null)
  const [activeTab, setActiveTab] = useState<'diagnosis' | 'solution'>('diagnosis')

  const filtered =
    activeCategory === 'All'
      ? symptoms
      : symptoms.filter((s) => s.category === activeCategory)

  const closeModal = useCallback(() => setOpen(null), [])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, closeModal])

  function openSymptom(s: Symptom) {
    setOpen(s)
    setActiveTab('diagnosis')
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="symptom-filter-bar" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              border: '1.5px solid',
              borderColor: activeCategory === cat ? '#4A8C2A' : 'rgba(255,255,255,0.15)',
              background: activeCategory === cat ? '#4A8C2A' : 'transparent',
              color: activeCategory === cat ? '#fff' : 'var(--text-muted)',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.75rem' }}>
        {filtered.length} symptom{filtered.length !== 1 ? 's' : ''} shown
      </p>

      {/* Card Grid */}
      <div className="symptom-grid" style={{ marginTop: '1.25rem' }}>
        {filtered.map((s) => (
          <button
            key={s._id}
            onClick={() => openSymptom(s)}
            style={{
              textAlign: 'left',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'border-color 0.15s, transform 0.15s',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(74,140,42,0.5)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {/* Category + Severity row */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '2px 8px',
                  borderRadius: '3px',
                }}
              >
                {s.category}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: SEVERITY_COLOR[s.severity] ?? '#D4601A',
                  background: `${SEVERITY_COLOR[s.severity] ?? '#D4601A'}22`,
                  padding: '2px 8px',
                  borderRadius: '3px',
                }}
              >
                {s.severity}
              </span>
            </div>

            {/* Name */}
            <h3
              style={{
                fontFamily: 'var(--font-roboto-slab, "Roboto Slab", serif)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--text)',
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {s.symptomName}
            </h3>

            {/* Short description */}
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {s.shortDescription}
            </p>

            {/* CTA */}
            <span
              style={{
                marginTop: 'auto',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: '#4A8C2A',
              }}
            >
              See diagnosis &amp; fix →
            </span>
          </button>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="symptom-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal()
          }}
          role="dialog"
          aria-modal="true"
          aria-label={open.symptomName}
        >
          <div className="symptom-modal-panel">
            {/* Modal Header */}
            <div
              style={{
                padding: '1.5rem 1.5rem 1rem',
                borderBottom: '1px solid var(--border)',
                position: 'sticky',
                top: 0,
                background: 'var(--surface)',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--text-muted)',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}
                    >
                      {open.category}
                    </span>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: SEVERITY_COLOR[open.severity] ?? '#D4601A',
                        background: `${SEVERITY_COLOR[open.severity] ?? '#D4601A'}22`,
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}
                    >
                      {open.severity} severity
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-roboto-slab, "Roboto Slab", serif)',
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: 'var(--text)',
                      margin: 0,
                    }}
                  >
                    {open.symptomName}
                  </h2>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Tab bar */}
              <div style={{ display: 'flex', gap: '0.25rem', marginTop: '1rem' }}>
                {(['diagnosis', 'solution'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '4px',
                      border: 'none',
                      background: activeTab === tab ? '#4A8C2A' : 'rgba(255,255,255,0.06)',
                      color: activeTab === tab ? '#fff' : 'var(--text-muted)',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.15s',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem' }}>
              {/* Infographic */}
              {open.infographicUrl && (
                <img
                  src={open.infographicUrl}
                  alt={`${open.symptomName} infographic`}
                  style={{
                    width: '100%',
                    borderRadius: '6px',
                    marginBottom: '1.25rem',
                    border: '1px solid var(--border)',
                  }}
                />
              )}

              {/* Tab content */}
              <div
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'var(--text)',
                }}
              >
                {activeTab === 'diagnosis' && open.diagnosis?.length > 0 && (
                  <PortableText
                    value={open.diagnosis as Parameters<typeof PortableText>[0]['value']}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p style={{ marginBottom: '1rem', marginTop: 0 }}>{children}</p>
                        ),
                      },
                    }}
                  />
                )}
                {activeTab === 'solution' && open.solution?.length > 0 && (
                  <PortableText
                    value={open.solution as Parameters<typeof PortableText>[0]['value']}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p style={{ marginBottom: '1rem', marginTop: 0 }}>{children}</p>
                        ),
                      },
                    }}
                  />
                )}
              </div>

              {/* Prevention tip */}
              {open.preventionTip && (
                <div
                  style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(74,140,42,0.08)',
                    border: '1px solid rgba(74,140,42,0.25)',
                    borderRadius: '6px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#4A8C2A',
                      margin: '0 0 0.4rem',
                    }}
                  >
                    Prevention
                  </p>
                  <p style={{ fontSize: '0.87rem', lineHeight: 1.6, color: 'var(--text)', margin: 0 }}>
                    {open.preventionTip}
                  </p>
                </div>
              )}

              {/* Related video */}
              {open.relatedVideo && (
                <div style={{ marginTop: '1.25rem' }}>
                  <a
                    href={open.relatedVideo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: '#D4601A',
                    }}
                  >
                    ▶ Watch related video
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
