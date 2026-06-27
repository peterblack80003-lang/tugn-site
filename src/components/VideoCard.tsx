import Image from 'next/image'
import type { VideoItem } from '@/lib/youtube'

function getRelativeTime(dateString: string): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diffMs = new Date(dateString).getTime() - Date.now()
  const diffDays = Math.round(diffMs / 86_400_000)
  const diffWeeks = Math.round(diffMs / 604_800_000)
  const diffMonths = Math.round(diffMs / 2_592_000_000)
  const diffYears = Math.round(diffMs / 31_536_000_000)
  const absD = Math.abs(diffDays)
  if (absD < 1) return 'today'
  if (absD < 7) return rtf.format(diffDays, 'day')
  if (Math.abs(diffWeeks) < 5) return rtf.format(diffWeeks, 'week')
  if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, 'month')
  return rtf.format(diffYears, 'year')
}

type Props = Pick<VideoItem, 'videoId' | 'title' | 'thumbnail' | 'publishedAt'>

export default function VideoCard({ videoId, title, thumbnail, publishedAt }: Props) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-transform duration-200 hover:scale-105"
      style={{
        display: 'block',
        background: '#1a2535',
        border: '1px solid rgba(232,223,200,0.07)',
        borderRadius: '8px',
        overflow: 'hidden',
        textDecoration: 'none',
      }}
    >
      {/* Thumbnail — 16:9 */}
      <div style={{ position: 'relative', aspectRatio: '16 / 9' }}>
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        {/* Play icon overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: '50%',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white" aria-hidden="true">
              <path d="M4 3l10 5-10 5V3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1rem 1.1rem 1.1rem' }}>
        <h3
          className="line-clamp-2"
          style={{
            fontSize: '0.9rem',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            fontWeight: 600,
            color: '#E8DFC8',
            lineHeight: 1.45,
            marginBottom: '0.6rem',
          }}
        >
          {title}
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: 'rgba(232,223,200,0.4)',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            {getRelativeTime(publishedAt)}
          </span>
          <span
            style={{
              fontSize: '0.78rem',
              color: '#4A8C2A',
              fontWeight: 600,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            Watch →
          </span>
        </div>
      </div>
    </a>
  )
}
