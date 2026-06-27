import type { Metadata } from 'next'
import Link from 'next/link'
import { getPlaylistVideos } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'

export const metadata: Metadata = {
  title: 'Raised Bed Command Center — Build, Fill, and Run a Better Garden System',
  description:
    'Everything you need to build and run a productive raised bed garden in Denver and Zone 5b. Soil systems, bed sizing, watering, seasonal timing — practical and proven.',
}

const bedSizes = [
  {
    name: 'The Standard',
    size: '4 × 8 ft',
    bestFor: 'Most home gardeners',
    why: 'Maximum reach from both sides, fits standard lumber, enough space to rotate crops.',
  },
  {
    name: 'The Deep Bed',
    size: '4 × 12 ft',
    bestFor: 'Serious producers',
    why: 'More growing space, same reach principle.',
  },
  {
    name: 'The Compact',
    size: '4 × 4 ft',
    bestFor: 'Small spaces, beginners',
    why: 'Easiest to manage, great for one crop focus.',
  },
  {
    name: 'The Square',
    size: '3 × 6 ft',
    bestFor: 'Odd spaces, balconies',
    why: 'Flexible placement.',
  },
]

const soilLayers = [
  {
    label: 'Base Layer',
    material: 'Compost',
    ratio: '40–50% of total volume',
    desc: 'The engine of the system. No shortcuts here.',
    accentColor: '#4A8C2A',
  },
  {
    label: 'Structure Layer',
    material: 'Topsoil or raised bed mix',
    ratio: '30–40%',
    desc: 'Holds moisture, provides mineral content.',
    accentColor: '#D4601A',
  },
  {
    label: 'Amendment Layer',
    material: 'Perlite, coconut coir, or vermiculite',
    ratio: '10–20%',
    desc: 'Drainage and aeration.',
    accentColor: '#8B5E3C',
  },
]

const timeline = [
  { period: 'Late March / Early April', action: 'Uncover beds, amend soil if needed, check drip lines.' },
  { period: 'May 1–15', action: 'Plant cold-hardy crops direct. Start hardening off transplants.' },
  { period: 'After May 15', action: 'Full planting. Tomatoes, peppers, squash go in.' },
  { period: 'June – August', action: 'Peak season. Monitor water, watch for pests.' },
  { period: 'September', action: 'Succession planting for fall. Row cover on standby.' },
  { period: 'October', action: 'First frost. Cover or harvest. Begin bed prep for next year.' },
]

export default async function RaisedBedCommandCenter() {
  const [soilHealthVideos, seedStartingVideos] = await Promise.all([
    getPlaylistVideos('PLNx2xiJoL9reKCOlPUsHhxl3NSmps-Rdl', 2),
    getPlaylistVideos('PLNx2xiJoL9rcW3qYSyIjawbduFC4B2XfB', 2),
  ])
  const raisedBedVideos = [...soilHealthVideos, ...seedStartingVideos]
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
            Raised Bed Command Center
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
            Build it right, fill it right, run it right — a system that actually produces food
          </p>
        </div>
      </section>

      {/* ── WHY RAISED BEDS WIN IN DENVER ── */}
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
            Why Raised Beds Win in Denver
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
            Denver&apos;s native soil is heavy clay that drains poorly and warms slowly. Raised beds sidestep
            all of it — you control the soil, the drainage, and the microclimate. In Zone 5b, a good raised
            bed system can extend your effective season by 2–3 weeks in both directions.
          </p>
        </div>
      </section>

      {/* ── BED SIZING GUIDE ── */}
      <section style={{ background: '#111827', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
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
            Sizing
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '2rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Bed Sizing Guide
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {bedSizes.map((bed) => (
              <div
                key={bed.name}
                style={{
                  background: '#1a2535',
                  border: '1px solid rgba(232,223,200,0.07)',
                  borderTop: '3px solid #4A8C2A',
                  borderRadius: '8px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
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
                    margin: 0,
                  }}
                >
                  {bed.name}
                </p>
                <p
                  style={{
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-roboto-slab, serif)',
                    fontWeight: 700,
                    color: '#E8DFC8',
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {bed.size}
                </p>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(232,223,200,0.45)',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontWeight: 500,
                  }}
                >
                  Best for: <span style={{ color: 'rgba(232,223,200,0.7)', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>{bed.bestFor}</span>
                </p>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(232,223,200,0.65)',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    margin: 0,
                  }}
                >
                  {bed.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SOIL SYSTEM ── */}
      <section style={{ background: '#1a2535', padding: '4rem 0' }}>
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
            Soil
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            What Goes In the Bed Matters More Than the Bed Itself
          </h2>
          <div className="series-grid" style={{ marginTop: '1.75rem' }}>
            {soilLayers.map((layer) => (
              <div
                key={layer.label}
                style={{
                  background: '#111827',
                  border: '1px solid rgba(232,223,200,0.07)',
                  borderTop: `3px solid ${layer.accentColor}`,
                  borderRadius: '8px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <p
                  style={{
                    color: layer.accentColor,
                    fontSize: '10px',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {layer.label}
                </p>
                <p
                  style={{
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-roboto-slab, serif)',
                    fontWeight: 700,
                    color: '#E8DFC8',
                    margin: 0,
                  }}
                >
                  {layer.material}
                </p>
                <p
                  style={{
                    fontSize: '0.78rem',
                    color: layer.accentColor,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {layer.ratio}
                </p>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'rgba(232,223,200,0.65)',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    margin: 0,
                  }}
                >
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: '1.75rem',
              fontSize: '0.9rem',
              color: 'rgba(232,223,200,0.5)',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              borderLeft: '3px solid rgba(74,140,42,0.35)',
              paddingLeft: '1rem',
            }}
          >
            The specific ratios matter less than using quality inputs. Cheap bagged soil produces cheap results.
          </p>
        </div>
      </section>

      {/* ── WATERING IN DENVER ── */}
      <section
        style={{
          background: '#111827',
          borderTop: '1px solid rgba(232,223,200,0.06)',
          padding: '4rem 0',
        }}
      >
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
            Watering
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Watering in Denver
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
            Denver&apos;s low humidity and high altitude mean raised beds dry out faster than you&apos;d expect.
            Drip irrigation is not optional — it&apos;s the difference between a productive bed and a daily chore.
            Soaker hose or drip tape, timer-controlled, morning run. That&apos;s the system.
          </p>
        </div>
      </section>

      {/* ── SEASONAL TIMELINE ── */}
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
            Zone 5b · Season Schedule
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Seasonal Timeline for Raised Beds in Zone 5b
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {timeline.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(160px, 200px) 1fr',
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
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    letterSpacing: '0.3px',
                    paddingTop: '0.1rem',
                    lineHeight: 1.4,
                  }}
                >
                  {item.period}
                </span>
                <span
                  style={{
                    color: 'rgba(232,223,200,0.8)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  }}
                >
                  {item.action}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES ── */}
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
            Keep Going
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '1.75rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Related Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link
              href="/zone-5-denver-gardening-guide"
              style={{
                display: 'block',
                background: '#1a2535',
                border: '1px solid rgba(74,140,42,0.2)',
                borderTop: '3px solid #4A8C2A',
                borderRadius: '8px',
                padding: '1.75rem',
                transition: 'border-color 0.15s',
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
                  margin: '0 0 0.6rem',
                }}
              >
                Guide
              </p>
              <p
                style={{
                  fontSize: '1.05rem',
                  fontFamily: 'var(--font-roboto-slab, serif)',
                  fontWeight: 700,
                  color: '#E8DFC8',
                  margin: '0 0 0.5rem',
                  lineHeight: 1.3,
                }}
              >
                Zone 5b Denver Gardening Guide
              </p>
              <span
                style={{
                  color: '#4A8C2A',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                }}
              >
                Read the guide →
              </span>
            </Link>

            <div
              style={{
                background: '#1a2535',
                border: '1px dashed rgba(232,223,200,0.12)',
                borderTop: '3px solid rgba(232,223,200,0.15)',
                borderRadius: '8px',
                padding: '1.75rem',
              }}
            >
              <p
                style={{
                  color: 'rgba(232,223,200,0.35)',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontWeight: 700,
                  margin: '0 0 0.6rem',
                }}
              >
                Guide
              </p>
              <p
                style={{
                  fontSize: '1.05rem',
                  fontFamily: 'var(--font-roboto-slab, serif)',
                  fontWeight: 700,
                  color: 'rgba(232,223,200,0.45)',
                  margin: '0 0 0.5rem',
                  lineHeight: 1.3,
                }}
              >
                Tomato Problem Solver
              </p>
              <span
                style={{
                  color: 'rgba(232,223,200,0.3)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontStyle: 'italic',
                }}
              >
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO LIBRARY ── */}
      <section
        style={{
          background: '#1a2535',
          borderTop: '1px solid rgba(232,223,200,0.06)',
          padding: '4rem 0',
        }}
      >
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
            Watch: Raised Bed Systems &amp; Soil
          </h2>
          {raisedBedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {raisedBedVideos.map((video) => (
                <VideoCard key={video.videoId} {...video} />
              ))}
            </div>
          ) : (
            <div
              style={{
                background: '#111827',
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
                Raised bed build and soil videos — coming soon.
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
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            Want to see the actual system in action?
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
            Watch the build and grow process on YouTube — real garden, real results, Zone 5b Denver.
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
