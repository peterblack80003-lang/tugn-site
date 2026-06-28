'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface VideoArticle {
  _id: string
  title: string
  slug: { current: string }
  youtubeVideoId?: string
  publishedAt?: string
  excerpt?: string
  contentLane?: string
  tags?: string[]
}

interface Props {
  videos: VideoArticle[]
}

const laneColor: Record<string, string> = {
  'Lane A': '#D4601A',
  'Lane B': '#4A8C2A',
  'Lane C': '#8B5E3C',
}

const LANES = ['All', 'Lane A', 'Lane B', 'Lane C'] as const
type LaneFilter = (typeof LANES)[number]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function VideoLibraryGrid({ videos }: Props) {
  const [activeFilter, setActiveFilter] = useState<LaneFilter>('All')

  const filtered =
    activeFilter === 'All'
      ? videos
      : videos.filter((v) => v.contentLane === activeFilter)

  return (
    <>
      {/* ── FILTER BAR ── */}
      <div
        style={{
          background: '#0d1420',
          borderBottom: '1px solid rgba(232,223,200,0.07)',
          padding: '0 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1100px',
            display: 'flex',
            gap: '0.25rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {LANES.map((lane) => {
            const isActive = activeFilter === lane
            const accent = lane === 'All' ? '#4A8C2A' : laneColor[lane]
            return (
              <button
                key={lane}
                onClick={() => setActiveFilter(lane)}
                style={{
                  background: isActive ? `${accent}18` : 'transparent',
                  color: isActive ? accent : 'rgba(232,223,200,0.45)',
                  border: 'none',
                  borderBottom: isActive ? `2px solid ${accent}` : '2px solid transparent',
                  padding: '0.85rem 1.1rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s, border-color 0.15s, background 0.15s',
                }}
              >
                {lane}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={{ background: '#111827', padding: '3.5rem 1.5rem 6rem' }}>
        <div className="container" style={{ maxWidth: '1100px' }}>
          {filtered.length === 0 ? (
            <div
              style={{
                background: '#1a2535',
                border: '1px dashed rgba(232,223,200,0.12)',
                borderRadius: '8px',
                padding: '4rem 2rem',
                textAlign: 'center',
                maxWidth: '520px',
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
                {activeFilter === 'All' ? 'Coming Soon' : `No ${activeFilter} Videos Yet`}
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
                {activeFilter === 'All'
                  ? 'Video articles are being added — check back soon.'
                  : `No published video articles in ${activeFilter} yet.`}
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
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {filtered.map((video) => {
                const accent = video.contentLane ? laneColor[video.contentLane] ?? '#4A8C2A' : '#4A8C2A'
                const thumbUrl = video.youtubeVideoId
                  ? `https://img.youtube.com/vi/${video.youtubeVideoId}/hqdefault.jpg`
                  : null

                return (
                  <Link
                    key={video._id}
                    href={`/videos/${video.slug.current}`}
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
                  >
                    <article
                      style={{
                        background: '#1a2535',
                        border: '1px solid rgba(232,223,200,0.07)',
                        borderTop: `3px solid ${accent}`,
                        borderRadius: '8px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        transition: 'border-color 0.15s, transform 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0d1420' }}>
                        {thumbUrl ? (
                          <Image
                            src={thumbUrl}
                            alt={video.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            style={{ objectFit: 'cover' }}
                            unoptimized
                          />
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="rgba(255,255,255,0.15)">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        )}
                        {/* Play icon overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(0,0,0,0.2)',
                          }}
                        >
                          <div
                            style={{
                              width: '44px',
                              height: '44px',
                              background: 'rgba(0,0,0,0.6)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '1.25rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.6rem' }}>
                        {/* Lane badge */}
                        {video.contentLane && (
                          <span
                            style={{
                              color: accent,
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '2.5px',
                              textTransform: 'uppercase',
                              fontFamily: 'var(--font-inter, Inter, sans-serif)',
                            }}
                          >
                            {video.contentLane}
                          </span>
                        )}

                        {/* Title */}
                        <h2
                          style={{
                            fontSize: '1rem',
                            color: '#E8DFC8',
                            fontFamily: 'var(--font-roboto-slab, serif)',
                            fontWeight: 700,
                            lineHeight: 1.3,
                            margin: 0,
                          }}
                        >
                          {video.title}
                        </h2>

                        {/* Excerpt */}
                        {video.excerpt && (
                          <p
                            style={{
                              fontSize: '0.875rem',
                              color: 'rgba(232,223,200,0.6)',
                              lineHeight: 1.65,
                              fontFamily: 'var(--font-inter, Inter, sans-serif)',
                              margin: 0,
                              flex: 1,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {video.excerpt}
                          </p>
                        )}

                        {/* Footer */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '0.5rem',
                            paddingTop: '0.75rem',
                            borderTop: '1px solid rgba(232,223,200,0.06)',
                            gap: '0.5rem',
                          }}
                        >
                          {video.publishedAt && (
                            <span
                              style={{
                                color: 'rgba(232,223,200,0.3)',
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                              }}
                            >
                              {formatDate(video.publishedAt)}
                            </span>
                          )}
                          <span
                            style={{
                              color: accent,
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              fontFamily: 'var(--font-inter, Inter, sans-serif)',
                              marginLeft: 'auto',
                            }}
                          >
                            Read Article →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
