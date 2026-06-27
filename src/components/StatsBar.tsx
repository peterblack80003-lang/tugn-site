'use client'

import { useState, useEffect } from 'react'

interface Stat {
  number: string
  label: string
}

export default function StatsBar() {
  const [videoCount, setVideoCount] = useState<number>(50)

  useEffect(() => {
    fetch('/api/youtube')
      .then((r) => r.json())
      .then((data: { videoCount?: number }) => {
        if (data?.videoCount) setVideoCount(data.videoCount)
      })
      .catch(() => {})
  }, [])

  const stats: Stat[] = [
    { number: String(videoCount), label: 'VIDEOS' },
    { number: '3', label: 'SERIES' },
    { number: '5b', label: 'ZONE TESTED' },
    { number: '0', label: 'GIMMICKS' },
  ]

  return (
    <section
      style={{
        background: '#4A8C2A',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={stat.label} className="stat-item" style={{ textAlign: 'center' }}>
            {i > 0 && (
              <span
                className="stat-divider"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '20%',
                  height: '60%',
                  width: '1px',
                  background: 'rgba(255,255,255,0.2)',
                }}
              />
            )}
            <div
              style={{
                color: '#fff',
                fontSize: '2.25rem',
                fontFamily: 'var(--font-roboto-slab, serif)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '0.35rem',
              }}
            >
              {stat.number}
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontWeight: 600,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
