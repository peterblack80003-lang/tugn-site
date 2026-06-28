import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { getZoneGuide } from '@/lib/queries'
import { getPlaylistVideos } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import Link from 'next/link'
import DenverTipsAccordion from './DenverTipsAccordion'

export const metadata: Metadata = {
  title: 'Zone 5b Denver Gardening Guide — What Actually Works on the Front Range',
  description:
    "Complete Zone 5b planting calendar, frost dates, and Denver-specific growing tips for Wheat Ridge and Denver, Colorado. Real gardening advice from someone who gardens here.",
}

type CalendarRow = {
  _key: string
  month: string
  sowIndoors: string
  transplant: string
  directSow: string
  notes: string
}

type TipSection = {
  _key: string
  heading: string
  body: unknown[]
}

type ZoneGuide = {
  _id: string
  title: string
  intro: unknown[]
  lastFrostDate: string
  firstFrostDate: string
  growingSeasonLength: string
  plantingCalendar: CalendarRow[]
  denverSpecificTips: TipSection[]
  relatedVideos: string[]
}

const growsWell = {
  reliable: ['Tomatoes (with right variety)', 'Zucchini', 'Kale', 'Peppers', 'Green beans', 'Basil', 'Chard'],
  worthIt: ['Corn (short season varieties)', 'Watermelon (start early)', 'Eggplant'],
  skip: ['Okra (too short a season)', 'Sweet potatoes (marginal)', 'Artichokes (iffy perennial)'],
}

export default async function Zone5DenverGardeningGuidePage() {
  const [guide, beginnersVideos, startGardenVideos] = await Promise.all([
    getZoneGuide().catch((): ZoneGuide | null => null),
    getPlaylistVideos('PLNx2xiJoL9rdGgHwdvbxV2KNl4-rGePEv', 2).catch(() => []),
    getPlaylistVideos('PLNx2xiJoL9reoiNxuc_Eypa5lq35hF3Zi', 2).catch(() => []),
  ])
  const zone5Videos = [...beginnersVideos, ...startGardenVideos]

  const title = (guide as ZoneGuide | null)?.title ?? 'Zone 5b Denver Gardening Guide'
  const intro = (guide as ZoneGuide | null)?.intro ?? null
  const lastFrostDate = (guide as ZoneGuide | null)?.lastFrostDate ?? 'May 7 (average)'
  const firstFrostDate = (guide as ZoneGuide | null)?.firstFrostDate ?? 'October 7 (average)'
  const growingSeasonLength = (guide as ZoneGuide | null)?.growingSeasonLength ?? 'Approximately 153 days'
  const plantingCalendar = (guide as ZoneGuide | null)?.plantingCalendar ?? []
  const denverSpecificTips = (guide as ZoneGuide | null)?.denverSpecificTips ?? []

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-img-hero">
        <Image
          src="/garden-wide-full.webp"
          alt="Zone 5b Denver raised garden beds"
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
            Zone 5b Denver Gardening Guide
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'rgba(232,223,200,0.82)',
              lineHeight: 1.65,
              maxWidth: '560px',
              margin: 0,
            }}
          >
            Frost dates, planting calendars, and Front Range growing conditions
            for Wheat Ridge and the Denver Metro area
          </p>
        </div>
      </section>

      {/* ── Frost dates card ── */}
      <section style={{ background: 'var(--surface)', padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: '1.25rem', color: '#E8DFC8', marginBottom: '1.5rem' }}>
            Your Growing Window
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <FrostCard label="Average Last Frost" value={lastFrostDate} accent="#4A8C2A" />
            <FrostCard label="Average First Frost" value={firstFrostDate} accent="#D4601A" />
            <FrostCard label="Growing Season" value={growingSeasonLength} accent="#E8DFC8" />
          </div>
        </div>
      </section>

      {/* ── Planting calendar ── */}
      {plantingCalendar.length > 0 && (
        <section style={{ background: 'var(--bg)', padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1100px' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#E8DFC8', marginBottom: '0.4rem' }}>
              Zone 5b Monthly Planting Calendar
            </h2>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(232,223,200,0.45)',
                marginBottom: '1.75rem',
                lineHeight: 1.5,
              }}
            >
              Based on average last frost May 7 and first frost October 7 for the Denver / Wheat Ridge area.
              Scroll right on mobile.
            </p>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table
                style={{
                  width: '100%',
                  minWidth: '640px',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                  lineHeight: 1.45,
                }}
              >
                <thead>
                  <tr style={{ background: 'var(--surface)' }}>
                    {['Month', 'Sow Indoors', 'Transplant', 'Direct Sow', 'Notes'].map((col) => (
                      <th
                        key={col}
                        style={{
                          padding: '0.7rem 1rem',
                          textAlign: 'left',
                          color: '#4A8C2A',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.07em',
                          borderBottom: '2px solid #4A8C2A',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {plantingCalendar.map((row, i) => (
                    <tr
                      key={row._key}
                      style={{
                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.022)',
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      <td
                        style={{
                          padding: '0.85rem 1rem',
                          color: '#E8DFC8',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          fontFamily: 'var(--font-roboto-slab, serif)',
                          fontSize: '0.88rem',
                        }}
                      >
                        {row.month}
                      </td>
                      <CalendarCell value={row.sowIndoors} />
                      <CalendarCell value={row.transplant} />
                      <CalendarCell value={row.directSow} />
                      <td
                        style={{
                          padding: '0.85rem 1rem',
                          color: 'rgba(232,223,200,0.5)',
                          fontStyle: 'italic',
                          fontSize: '0.82rem',
                          lineHeight: 1.5,
                        }}
                      >
                        {row.notes || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Denver-specific tips accordion ── */}
      {denverSpecificTips.length > 0 && (
        <section style={{ background: 'var(--surface)', padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <h2 style={{ fontSize: '1.25rem', color: '#E8DFC8', marginBottom: '0.4rem' }}>
              Denver-Specific Growing Tips
            </h2>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'rgba(232,223,200,0.45)',
                marginBottom: '1.75rem',
                lineHeight: 1.5,
              }}
            >
              What the generic gardening books don&apos;t tell you about growing at 5,280 feet.
            </p>
            <DenverTipsAccordion tips={denverSpecificTips} />
          </div>
        </section>
      )}

      {/* ── What grows well ── */}
      <section style={{ background: 'var(--bg)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '2rem',
            }}
          >
            What Grows Well in Zone 5b Denver
          </h2>
          <div className="series-grid">
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(74,140,42,0.2)',
                borderTop: '3px solid #4A8C2A',
                borderRadius: '8px',
                padding: '1.75rem',
              }}
            >
              <p
                style={{
                  color: '#4A8C2A',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '1.1rem',
                }}
              >
                Reliable Producers
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {growsWell.reliable.map((item) => (
                  <li key={item} style={{ color: 'rgba(232,223,200,0.8)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#4A8C2A', fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(212,96,26,0.2)',
                borderTop: '3px solid #D4601A',
                borderRadius: '8px',
                padding: '1.75rem',
              }}
            >
              <p
                style={{
                  color: '#D4601A',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '1.1rem',
                }}
              >
                Worth the Effort
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {growsWell.worthIt.map((item) => (
                  <li key={item} style={{ color: 'rgba(232,223,200,0.8)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ color: '#D4601A', fontWeight: 700, flexShrink: 0 }}>&#8594;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid rgba(232,223,200,0.08)',
                borderTop: '3px solid rgba(232,223,200,0.2)',
                borderRadius: '8px',
                padding: '1.75rem',
              }}
            >
              <p
                style={{
                  color: 'rgba(232,223,200,0.45)',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '1.1rem',
                }}
              >
                Skip It
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {growsWell.skip.map((item) => (
                  <li key={item} style={{ color: 'rgba(232,223,200,0.45)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span style={{ flexShrink: 0 }}>&#10007;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Raised bed advantage ── */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '4rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.25rem',
            }}
          >
            The Raised Bed Advantage
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.75)',
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            Raised beds warm up 2–3 weeks earlier than in-ground plots in Denver&apos;s clay-heavy soil.
            This effectively extends the season and is why most successful Front Range food gardeners use them.
          </p>
          <Link
            href="/raised-bed-command-center"
            style={{ color: '#4A8C2A', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            Raised Bed Command Center &#8594;
            <span style={{ color: 'rgba(232,223,200,0.3)', fontSize: '0.78rem', fontWeight: 400 }}>
              (page coming soon)
            </span>
          </Link>
        </div>
      </section>

      {/* ── Video library ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            Video Library
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.75rem',
            }}
          >
            Watch: Getting Started in Zone 5b Denver
          </h2>
          {zone5Videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {zone5Videos.map((video) => (
                <VideoCard key={video.videoId} {...video} />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: 'var(--surface)',
                border: '1px dashed rgba(232,223,200,0.15)',
                borderRadius: '8px',
                padding: '3rem 2rem',
                textAlign: 'center',
              }}
            >
              <p style={{ color: 'rgba(232,223,200,0.45)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                Zone 5 getting-started videos — coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: '#1a3a1a',
          borderTop: '1px solid rgba(74,140,42,0.25)',
          padding: '5rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '580px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              color: '#E8DFC8',
              marginBottom: '1rem',
            }}
          >
            Growing in Denver? Let&apos;s compare notes.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              marginBottom: '2rem',
            }}
          >
            Subscribe on YouTube for weekly proof-first gardening content from Wheat Ridge, Colorado.
          </p>
          <a
            href="https://youtube.com/@theurbangardeningneighbor"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green"
          >
            Watch on YouTube
          </a>
        </div>
      </section>
    </>
  )
}

function FrostCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      style={{
        background: 'var(--surface2)',
        border: `1px solid ${accent}30`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: '6px',
        padding: '1.25rem 1.5rem',
      }}
    >
      <div
        style={{
          fontSize: '0.7rem',
          color: 'rgba(232,223,200,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.09em',
          fontWeight: 600,
          marginBottom: '0.45rem',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: '1.15rem',
          color: '#E8DFC8',
          fontWeight: 700,
          fontFamily: 'var(--font-roboto-slab, serif)',
          lineHeight: 1.25,
        }}
      >
        {value}
      </div>
    </div>
  )
}

function CalendarCell({ value }: { value: string }) {
  const isEmpty = !value || value === '—' || value === '-'
  return (
    <td
      style={{
        padding: '0.85rem 1rem',
        color: isEmpty ? 'rgba(232,223,200,0.18)' : 'rgba(232,223,200,0.82)',
        verticalAlign: 'top',
        lineHeight: 1.5,
      }}
    >
      {isEmpty ? '—' : value}
    </td>
  )
}
