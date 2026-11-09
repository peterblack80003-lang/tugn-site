'use client'

import { useState, useEffect } from 'react'

type Props = {
  /** Server-rendered fallback so the number never flashes from a placeholder. */
  initialVideoCount?: number
  articleCount?: number
}

export default function StatsBar({ initialVideoCount = 50, articleCount }: Props) {
  const [videoCount, setVideoCount] = useState<number>(initialVideoCount)

  useEffect(() => {
    fetch('/api/youtube')
      .then((r) => r.json())
      .then((data: { videoCount?: number }) => {
        if (data?.videoCount) setVideoCount(data.videoCount)
      })
      .catch(() => {})
  }, [])

  const stats: Array<{ number: string; label: string }> = [
    { number: String(videoCount), label: 'Videos' },
    articleCount ? { number: String(articleCount), label: 'Articles' } : { number: '4', label: 'Tracks' },
    { number: '5b', label: 'Zone tested' },
    { number: '0', label: 'Gimmicks' },
  ]

  return (
    <section className="fn-stats" aria-label="Channel at a glance">
      <div className="fn-container fn-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="fn-stat">
            <span className="fn-stat-num">{stat.number}</span>
            <span className="fn-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
