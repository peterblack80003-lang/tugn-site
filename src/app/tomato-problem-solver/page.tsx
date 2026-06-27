import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tomato Problem Solver — Diagnose What\'s Wrong With Your Tomato Plants',
  description:
    "Yellow leaves, blossom drop, cracked fruit, no flowers — diagnose your tomato problems fast. Practical fixes for Zone 5b Denver gardeners from someone who's made every mistake.",
}

const problems = [
  {
    name: 'Yellow Leaves (Lower)',
    symptoms: 'Bottom leaves turning yellow, starting from the lowest leaves upward.',
    cause: 'Normal aging, or early blight / septoria leaf spot.',
    fix: 'Remove affected leaves. Improve air circulation. Avoid overhead watering. Mulch to prevent soil splash.',
    quickFix: 'Remove leaves, improve airflow, mulch',
  },
  {
    name: 'Yellow Leaves (Upper / New Growth)',
    symptoms: 'New growth at top of plant is yellow or pale.',
    cause: 'Nutrient deficiency — usually iron or magnesium in alkaline Denver soil.',
    fix: "Test soil pH. Add chelated iron or Epsom salt (magnesium). Denver's alkaline water makes this common.",
    quickFix: 'Chelated iron or Epsom salt',
  },
  {
    name: 'Blossom Drop',
    symptoms: 'Flowers appear but fall off before setting fruit.',
    cause: 'Temperature extremes — too hot (above 90°F) or too cold (below 55°F at night).',
    fix: 'Shade cloth during heat waves. Plant later in spring. Choose heat-tolerant varieties.',
    quickFix: 'Shade cloth; plant later; heat-tolerant varieties',
  },
  {
    name: 'Cracked or Split Fruit',
    symptoms: 'Tomatoes crack radially or concentrically as they ripen.',
    cause: 'Inconsistent watering — dry period followed by heavy water.',
    fix: 'Drip irrigation on a timer. Consistent moisture is the only fix.',
    quickFix: 'Drip irrigation on a timer',
  },
  {
    name: 'Blossom End Rot',
    symptoms: 'Dark, sunken, leathery patch on the bottom of the fruit.',
    cause: 'Calcium deficiency caused by inconsistent watering — not a soil problem.',
    fix: 'Consistent watering. Calcium sprays treat symptoms but don\'t fix the root cause.',
    quickFix: 'Consistent watering (calcium sprays are a band-aid)',
  },
  {
    name: 'No Fruit Set',
    symptoms: 'Plant looks healthy, flowers appear, but no tomatoes develop.',
    cause: "Pollination failure — no wind or pollinators, or humidity too low.",
    fix: "Shake plants gently each morning. Plant in open area. In Denver's dry air this is common.",
    quickFix: 'Shake plants daily; plant in open area',
  },
  {
    name: 'Curling Leaves',
    symptoms: 'Leaves curl upward, rolling into tubes.',
    cause: 'Heat stress or inconsistent watering. Sometimes normal physiological response.',
    fix: 'Increase watering. Add mulch. Usually not serious unless combined with other symptoms.',
    quickFix: 'More water, add mulch',
  },
  {
    name: 'White or Gray Patches on Leaves',
    symptoms: 'Powdery white or gray coating on leaf surfaces.',
    cause: 'Powdery mildew — common in late season as nights cool.',
    fix: 'Remove affected leaves. Improve airflow. Neem oil or baking soda spray. Accept some as normal end-of-season.',
    quickFix: 'Remove leaves, neem oil, improve airflow',
  },
  {
    name: 'Holes in Leaves',
    symptoms: 'Irregular holes chewed in leaves.',
    cause: 'Hornworms, flea beetles, or cutworms.',
    fix: 'Hand-pick hornworms (check undersides of leaves). Row cover for flea beetles early season. Bt spray if severe.',
    quickFix: 'Hand-pick hornworms; Bt spray if severe',
  },
  {
    name: 'Stunted Growth / Purple Tint',
    symptoms: 'Plant grows slowly, leaves have purple or reddish tint.',
    cause: 'Phosphorus deficiency or cold soil temperatures.',
    fix: "Don't plant too early. Soil below 60°F blocks phosphorus uptake. Wait for soil to warm.",
    quickFix: "Wait for soil to reach 60°F before planting",
  },
]

const accentColors = ['#D4601A', '#8B5E3C']

export default function TomatoProblemSolver() {
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
            Tomato Masterclass · Troubleshooting
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
            Tomato Problem Solver
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'rgba(232,223,200,0.7)',
              lineHeight: 1.7,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              maxWidth: '540px',
              margin: 0,
            }}
          >
            Something&apos;s wrong with your tomatoes. Let&apos;s figure out what.
          </p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ background: '#1a2535', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(232,223,200,0.75)',
              lineHeight: 1.8,
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              margin: 0,
            }}
          >
            Most tomato problems have simple causes. The hard part is knowing which simple cause
            you&apos;re looking at. This guide covers the most common problems Front Range gardeners
            run into — with what&apos;s actually causing them and what actually fixes them.
          </p>
        </div>
      </section>

      {/* ── PROBLEM DIAGNOSTIC CARDS ── */}
      <section style={{ background: '#111827', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <p
            style={{
              color: '#D4601A',
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            Diagnose
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: '#E8DFC8',
              marginBottom: '2rem',
              fontFamily: 'var(--font-roboto-slab, serif)',
            }}
          >
            10 Common Tomato Problems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {problems.map((problem, i) => {
              const accent = accentColors[i % 2]
              return (
                <div
                  key={problem.name}
                  style={{
                    background: '#1a2535',
                    border: '1px solid rgba(232,223,200,0.07)',
                    borderLeft: `4px solid ${accent}`,
                    borderRadius: '8px',
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem',
                  }}
                >
                  {/* Problem name */}
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      color: '#E8DFC8',
                      margin: 0,
                      fontFamily: 'var(--font-roboto-slab, serif)',
                      fontWeight: 700,
                      lineHeight: 1.2,
                    }}
                  >
                    {problem.name}
                  </h3>

                  {/* Symptoms */}
                  <div>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: accent,
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        margin: '0 0 0.3rem',
                      }}
                    >
                      You See
                    </p>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(232,223,200,0.75)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        margin: 0,
                      }}
                    >
                      {problem.symptoms}
                    </p>
                  </div>

                  {/* Cause */}
                  <div>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: accent,
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        margin: '0 0 0.3rem',
                      }}
                    >
                      Likely Cause
                    </p>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(232,223,200,0.75)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        margin: 0,
                      }}
                    >
                      {problem.cause}
                    </p>
                  </div>

                  {/* Fix */}
                  <div
                    style={{
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '5px',
                      padding: '0.9rem 1rem',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: '#4A8C2A',
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        fontWeight: 700,
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        margin: '0 0 0.3rem',
                      }}
                    >
                      Fix
                    </p>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: 'rgba(232,223,200,0.85)',
                        lineHeight: 1.6,
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        margin: 0,
                      }}
                    >
                      {problem.fix}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── QUICK REFERENCE TABLE ── */}
      <section style={{ background: '#1a2535', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
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
            Quick Reference
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontSize: '0.88rem',
              }}
            >
              <thead>
                <tr style={{ borderBottom: '2px solid #4A8C2A' }}>
                  {['Problem', 'Most Likely Cause', 'Quick Fix'].map((col) => (
                    <th
                      key={col}
                      style={{
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        color: 'rgba(232,223,200,0.5)',
                        fontWeight: 600,
                        fontSize: '0.72rem',
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
                {problems.map((p, i) => (
                  <tr
                    key={p.name}
                    style={{
                      borderBottom: '1px solid rgba(232,223,200,0.06)',
                      background: i % 2 !== 0 ? 'rgba(17,24,39,0.5)' : 'transparent',
                    }}
                  >
                    <td
                      style={{
                        padding: '0.85rem 1rem',
                        color: '#E8DFC8',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.name}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: 'rgba(232,223,200,0.65)' }}>
                      {p.cause}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#4A8C2A', fontWeight: 500 }}>
                      {p.quickFix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              style={{ display: 'block' }}
            >
              <div
                style={{
                  background: '#1a2535',
                  border: '1px solid rgba(74,140,42,0.2)',
                  borderTop: '3px solid #4A8C2A',
                  borderRadius: '8px',
                  padding: '1.75rem',
                  height: '100%',
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
                    margin: '0 0 0.75rem',
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
              </div>
            </Link>

            <Link
              href="/raised-bed-command-center"
              style={{ display: 'block' }}
            >
              <div
                style={{
                  background: '#1a2535',
                  border: '1px solid rgba(74,140,42,0.2)',
                  borderTop: '3px solid #4A8C2A',
                  borderRadius: '8px',
                  padding: '1.75rem',
                  height: '100%',
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
                    margin: '0 0 0.75rem',
                    lineHeight: 1.3,
                  }}
                >
                  Raised Bed Command Center
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
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── VIDEO RESOURCES ── */}
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
            Video Resources
          </h2>
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
              Tomato troubleshooting videos — coming soon.
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
            More tomato content every week.
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
            Subscribe on YouTube for proof-first tomato growing content from Zone 5b Denver.
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
