'use client'

import { useState } from 'react'
import Link from 'next/link'

const laneColor: Record<string, string> = {
  A: '#D4601A',
  B: '#4A8C2A',
  C: '#8B5E3C',
}

const laneLabel: Record<string, string> = {
  A: 'Tomato Masterclass',
  B: 'Garden Systems',
  C: 'FIX IT',
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  meta_description?: string
  published_at?: string
  content_lane?: string
  series?: string
  youtube_video_id?: string
  tags?: string[]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function tagLabel(tag: string) {
  return tag.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function ArticlesClient({ articles }: { articles: Article[] }) {
  const [activeTag, setActiveTag] = useState<string>('all')

  // Collect unique tags across all articles, sorted alphabetically
  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags ?? []))
  ).sort()

  const filtered =
    activeTag === 'all'
      ? articles
      : articles.filter((a) => a.tags?.includes(activeTag))

  if (articles.length === 0) {
    return (
      <div
        style={{
          background: '#1a2535',
          border: '1px dashed rgba(232,223,200,0.15)',
          borderRadius: '8px',
          padding: '4rem 2rem',
          textAlign: 'center',
          maxWidth: '560px',
          margin: '0 auto',
        }}
      >
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
          Coming Soon
        </p>
        <p
          style={{
            color: 'rgba(232,223,200,0.6)',
            fontSize: '1rem',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            lineHeight: 1.7,
            margin: '0 0 1.5rem',
          }}
        >
          Articles coming soon — check back after new videos drop.
        </p>
        <a
          href="https://youtube.com/@theurbangardeningneighbor"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          Watch on YouTube →
        </a>
      </div>
    )
  }

  return (
    <>
      {/* ── TAG FILTER ── */}
      {allTags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {['all', ...allTags].map((tag) => {
            const isActive = activeTag === tag
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  padding: '0.4rem 1rem',
                  borderRadius: '99px',
                  border: '1px solid rgba(232,223,200,0.25)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s',
                  background: isActive ? '#4A8C2A' : '#1a2535',
                  color: isActive ? '#ffffff' : 'rgba(232,223,200,0.75)',
                }}
              >
                {tag === 'all' ? 'All' : tagLabel(tag)}
              </button>
            )
          })}
        </div>
      )}

      {/* ── ARTICLE GRID ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
          gap: '1.75rem',
        }}
      >
        {filtered.map((article) => {
          const accent = article.content_lane
            ? laneColor[article.content_lane] ?? '#4A8C2A'
            : '#4A8C2A'
          const lane = article.content_lane
            ? laneLabel[article.content_lane]
            : null
          const blurb = article.excerpt || article.meta_description || ''

          return (
            <div
              key={article._id}
              style={{
                background: '#1a2535',
                border: '1px solid rgba(232,223,200,0.07)',
                borderTop: `3px solid ${accent}`,
                borderRadius: '8px',
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
              }}
            >
              {/* Lane label */}
              {lane && (
                <p
                  style={{
                    color: accent,
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {lane}
                </p>
              )}

              {/* Title */}
              <h2
                style={{
                  fontSize: '1.25rem',
                  color: '#E8DFC8',
                  margin: 0,
                  fontFamily: 'var(--font-roboto-slab, serif)',
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                {article.title}
              </h2>

              {/* Excerpt */}
              {blurb && (
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'rgba(232,223,200,0.7)',
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {blurb}
                </p>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.72rem',
                        color: 'rgba(232,223,200,0.45)',
                        background: 'rgba(232,223,200,0.06)',
                        border: '1px solid rgba(232,223,200,0.1)',
                        borderRadius: '4px',
                        padding: '0.15rem 0.5rem',
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      }}
                    >
                      {tagLabel(tag)}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer row: date + link */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.25rem',
                  paddingTop: '0.9rem',
                  borderTop: '1px solid rgba(232,223,200,0.06)',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                {article.published_at && (
                  <span
                    style={{
                      color: 'rgba(232,223,200,0.35)',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    }}
                  >
                    {formatDate(article.published_at)}
                  </span>
                )}
                <Link
                  href={`/articles/${article.slug.current}`}
                  style={{
                    color: accent,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    marginLeft: 'auto',
                  }}
                >
                  Read Article →
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
