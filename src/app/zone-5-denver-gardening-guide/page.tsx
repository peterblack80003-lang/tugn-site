import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Zone 5b Denver Gardening Guide — What Actually Works on the Front Range',
  description:
    "Real-world gardening advice for Zone 5b Denver and Wheat Ridge. Frost dates, planting windows, what survives Colorado's wild swings — from someone who gardens here.",
}

const frostTable = [
  { event: 'Last Spring Frost', average: 'May 7–15', safe: 'Plant after May 15' },
  { event: 'First Fall Frost', average: 'October 1–7', safe: 'Harvest by September 30' },
  { event: 'Growing Season', average: '~135–145 days', safe: 'Plan for 130 to be safe' },
  { event: 'Soil Workable', average: 'Late March – Early April', safe: 'Depends on snowpack' },
]

const monthlyCalendar = [
  { month: 'March', notes: 'Start seeds indoors (tomatoes, peppers, eggplant). Direct sow cold-hardy crops under cover.' },
  { month: 'April', notes: 'Harden off seedlings. Direct sow peas, spinach, lettuce. Still too cold for warm-season crops.' },
  { month: 'May', notes: 'After May 15 — transplant tomatoes, peppers, squash. Watch forecast carefully.' },
  { month: 'June', notes: 'Full planting season. Direct sow beans, cucumbers, squash. Tomatoes should be established.' },
  { month: 'July', notes: 'Maintenance mode. Watch for hail. Succession plant fast crops.' },
  { month: 'August', notes: 'Start fall crops — kale, spinach, lettuce. Tomatoes hitting peak.' },
  { month: 'September', notes: 'Harvest push. Watch frost forecast. Row cover ready.' },
  { month: 'October', notes: 'First frost likely early October. Season wrap-up.' },
]

const growsWell = {
  reliable: ['Tomatoes (with right variety)', 'Zucchini', 'Kale', 'Peppers', 'Green beans', 'Basil', 'Chard'],
  worthIt: ['Corn (short season varieties)', 'Watermelon (if you start early)', 'Eggplant'],
  skip: ['Okra (too short a season)', 'Sweet potatoes (marginal)', 'Artichokes (perennial but iffy)'],
}

export default function Zone5DenverGardeningGuide() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: '#111827',
          borderBottom: '3px solid #4A8C2A',
          padding: '80px 1.5rem 5rem',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '11px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '1.25rem',
              fontWeight: 500,
            }}
          >
            Zone 5b · Denver &amp; Front Range
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.1,
              color: '#E8DFC8',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontWeight: 700,
            }}
          >
            Zone 5b Denver Gardening Guide
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              maxWidth: '580px',
              margin: 0,
            }}
          >
            What actually works on the Front Range — from someone who gardens here
          </p>
        </div>
      </section>

      {/* ── THE ZONE 5B REALITY ── */}
      <section style={{ background: '#1a2535', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            The Zone 5b Reality
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.75)',
              lineHeight: 1.8,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              margin: 0,
            }}
          >
            Denver&apos;s Zone 5b means last frost around May 7–15, first fall frost around October 1–7.
            But the Front Range throws curveballs — late May snowstorms, hailstorms in July, temperature
            swings of 40°F in a day. This guide covers what actually works in this specific climate.
          </p>
        </div>
      </section>

      {/* ── FROST DATE TABLE ── */}
      <section style={{ background: '#111827', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
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
            Reference
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Frost Date Reference
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontSize: '0.92rem',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #4A8C2A' }}>
                  {['Event', 'Average Date', 'Safe Assumption'].map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        color: 'rgba(232,223,200,0.5)',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {frostTable.map((row, i) => (
                  <tr
                    key={row.event}
                    style={{
                      borderBottom: '1px solid rgba(232,223,200,0.06)',
                      background: i % 2 !== 0 ? 'rgba(26,37,53,0.6)' : 'transparent',
                    }}
                  >
                    <td style={{ padding: '1rem', color: '#E8DFC8', fontWeight: 500 }}>{row.event}</td>
                    <td style={{ padding: '1rem', color: 'rgba(232,223,200,0.7)' }}>{row.average}</td>
                    <td style={{ padding: '1rem', color: '#4A8C2A', fontWeight: 500 }}>{row.safe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── MONTHLY PLANTING CALENDAR ── */}
      <section style={{ background: '#1a2535', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
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
            March – October
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Monthly Planting Calendar
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {monthlyCalendar.map((item) => (
              <div
                key={item.month}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '90px 1fr',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: '#111827',
                  border: '1px solid rgba(232,223,200,0.06)',
                  borderRadius: '6px',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    color: '#4A8C2A',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    letterSpacing: '0.5px',
                    paddingTop: '0.1rem',
                  }}
                >
                  {item.month}
                </span>
                <span
                  style={{
                    color: 'rgba(232,223,200,0.8)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  }}
                >
                  {item.notes}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT GROWS WELL ── */}
      <section style={{ background: '#111827', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
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
            Zone 5b · Denver
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '2rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            What Grows Well in Zone 5b Denver
          </h2>
          <div className="series-grid">
            {/* Reliable Producers */}
            <div
              style={{
                background: '#1a2535',
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
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontWeight: 700,
                  marginBottom: '1.1rem',
                }}
              >
                Reliable Producers
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {growsWell.reliable.map((item) => (
                  <li
                    key={item}
                    style={{
                      color: 'rgba(232,223,200,0.8)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                    }}
                  >
                    <span style={{ color: '#4A8C2A', fontWeight: 700, flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Worth the Effort */}
            <div
              style={{
                background: '#1a2535',
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
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontWeight: 700,
                  marginBottom: '1.1rem',
                }}
              >
                Worth the Effort
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {growsWell.worthIt.map((item) => (
                  <li
                    key={item}
                    style={{
                      color: 'rgba(232,223,200,0.8)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                    }}
                  >
                    <span style={{ color: '#D4601A', fontWeight: 700, flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skip It */}
            <div
              style={{
                background: '#1a2535',
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
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontWeight: 700,
                  marginBottom: '1.1rem',
                }}
              >
                Skip It
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {growsWell.skip.map((item) => (
                  <li
                    key={item}
                    style={{
                      color: 'rgba(232,223,200,0.45)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                    }}
                  >
                    <span style={{ flexShrink: 0 }}>✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── RAISED BED ADVANTAGE ── */}
      <section
        style={{
          background: '#1a2535',
          borderTop: '1px solid rgba(232,223,200,0.06)',
          borderBottom: '1px solid rgba(232,223,200,0.06)',
          padding: '4rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            The Raised Bed Advantage
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.75)',
              lineHeight: 1.8,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              marginBottom: '1.5rem',
            }}
          >
            Raised beds warm up 2–3 weeks earlier than in-ground in Denver&apos;s clay-heavy soil.
            This effectively extends the season and is why most successful Front Range food gardeners use them.
          </p>
          <Link
            href="/raised-bed-command-center"
            style={{
              color: '#4A8C2A',
              fontSize: '0.9rem',
              fontWeight: 600,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Raised Bed Command Center →
            <span
              style={{
                color: 'rgba(232,223,200,0.3)',
                fontSize: '0.78rem',
                fontWeight: 400,
              }}
            >
              (page coming soon)
            </span>
          </Link>
        </div>
      </section>

      {/* ── VIDEO RESOURCES ── */}
      <section style={{ background: '#111827', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
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
            Video Library
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Watch: Zone 5 Gardening in Practice
          </h2>
          <div
            style={{
              background: '#1a2535',
              border: '1px dashed rgba(232,223,200,0.15)',
              borderRadius: '8px',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                color: 'rgba(232,223,200,0.45)',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Videos on Zone 5 timing, tomato selection, and raised bed setup — coming soon.
            </p>
          </div>
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
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Growing in Denver? Let&apos;s compare notes.
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
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
