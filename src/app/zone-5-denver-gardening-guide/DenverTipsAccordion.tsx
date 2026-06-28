'use client'
import { useState } from 'react'
import { PortableText } from '@portabletext/react'

type TipSection = {
  _key: string
  heading: string
  body: unknown[]
}

export default function DenverTipsAccordion({ tips }: { tips: TipSection[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {tips.map((tip, i) => (
        <div
          key={tip._key}
          style={{
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.1rem 1.5rem',
              background: openIndex === i ? 'rgba(74,140,42,0.08)' : 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#E8DFC8',
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontWeight: 700,
              fontSize: '1rem',
              textAlign: 'left',
              gap: '1rem',
              transition: 'background 0.15s',
            }}
          >
            <span>{tip.heading}</span>
            <span
              style={{
                color: '#4A8C2A',
                flexShrink: 0,
                fontSize: '1.3rem',
                lineHeight: 1,
                fontFamily: 'var(--font-inter, sans-serif)',
                fontWeight: 400,
              }}
            >
              {openIndex === i ? '−' : '+'}
            </span>
          </button>
          {openIndex === i && (
            <div
              style={{
                padding: '1rem 1.5rem 1.4rem',
                color: 'rgba(232,223,200,0.8)',
                lineHeight: 1.75,
                fontSize: '0.95rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              <PortableText value={tip.body as Parameters<typeof PortableText>[0]['value']} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
