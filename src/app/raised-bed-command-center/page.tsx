import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getRaisedBedHub } from '@/lib/queries'
import { getPlaylistVideos } from '@/lib/youtube'
import VideoCard from '@/components/VideoCard'
import TableOfContents from './TableOfContents'

export const metadata: Metadata = {
  title: 'Raised Bed Command Center — Build, Fill, and Run a Better Garden System',
  description:
    'Everything you need to build and run productive raised beds on the Front Range — soil systems, construction, irrigation, season extension, and year-round production.',
}

type RelatedLink = { _key: string; linkLabel: string; linkUrl: string }
type HubSection = {
  _key: string
  sectionTitle: string
  sectionBody: unknown[]
  relatedLinks: RelatedLink[]
}
type FeaturedTopic = {
  _key: string
  topicTitle: string
  topicDescription: string
  topicIcon: string
  linkUrl: string
}
type RaisedBedHub = {
  _id: string
  title: string
  intro: unknown[]
  hubSections: HubSection[]
  featuredTopics: FeaturedTopic[]
  relatedVideos: string[]
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function isExternal(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

const bedSizes = [
  { name: 'The Standard', size: '4 × 8 ft', bestFor: 'Most home gardeners', why: 'Maximum reach from both sides, fits standard lumber, enough space to rotate crops.' },
  { name: 'The Deep Bed', size: '4 × 12 ft', bestFor: 'Serious producers', why: 'More growing space, same reach principle. Stays 4 ft wide.' },
  { name: 'The Compact', size: '4 × 4 ft', bestFor: 'Small spaces, beginners', why: 'Easiest to manage, great for one crop focus or a balcony setup.' },
  { name: 'The Flex', size: '3 × 6 ft', bestFor: 'Odd spaces', why: 'Works around existing structures without wasting material.' },
]

const soilLayers = [
  { label: 'Base Layer', material: 'Compost', ratio: '30% of total volume', desc: 'The engine of the system. Quality here determines everything downstream.', accent: '#4A8C2A' },
  { label: 'Structure Layer', material: 'Screened Topsoil', ratio: '60%', desc: 'Holds moisture and provides mineral structure. Buy bulk from a landscape supplier.', accent: '#D4601A' },
  { label: 'Amendment Layer', material: 'Perlite or Vermiculite', ratio: '10%', desc: 'Drainage and aeration. Critical for Colorado\'s heavy rain events.', accent: '#8B5E3C' },
]

const timeline = [
  { period: 'Late March / Early April', action: 'Uncover beds, top-dress with compost, check and flush drip lines.' },
  { period: 'April', action: 'Cold-hardy crops go in. Harden off transplants. Watch nighttime temps.' },
  { period: 'After May 7', action: 'Full planting. Tomatoes, peppers, squash go in after last frost average.' },
  { period: 'June – August', action: 'Peak season. Succession plantings, monitor irrigation, watch hail forecasts.' },
  { period: 'September', action: 'Fall crops in. Row cover on standby. Harvest begins in earnest.' },
  { period: 'October', action: 'First frost (~Oct 7). Cover cold-hardy crops, harvest warm-season, plant garlic.' },
]

export default async function RaisedBedCommandCenterPage() {
  const [hub, soilHealthVideos, seedStartingVideos] = await Promise.all([
    getRaisedBedHub().catch((): RaisedBedHub | null => null),
    getPlaylistVideos('PLNx2xiJoL9reKCOlPUsHhxl3NSmps-Rdl', 2).catch(() => []),
    getPlaylistVideos('PLNx2xiJoL9rcW3qYSyIjawbduFC4B2XfB', 2).catch(() => []),
  ])
  const raisedBedVideos = [...soilHealthVideos, ...seedStartingVideos]

  const title = (hub as RaisedBedHub | null)?.title ?? 'Raised Bed Command Center'
  const intro = (hub as RaisedBedHub | null)?.intro ?? null
  const sections = (hub as RaisedBedHub | null)?.hubSections ?? []
  const topics = (hub as RaisedBedHub | null)?.featuredTopics ?? []
  const tocItems = sections.map((s) => ({ title: s.sectionTitle, anchor: slugify(s.sectionTitle) }))

  return (
    <>
      {/* ── Hero ── */}
      <section className="page-img-hero">
        <Image
          src="/garden-wide-full.webp"
          alt="Raised beds in a Zone 5b Denver garden"
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
            Raised Bed Command Center
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
            Everything you need to plan, build, and run a productive raised bed
            system in Denver&apos;s climate.
          </p>
        </div>
      </section>

      {/* ── Featured topics grid ── */}
      {topics.length > 0 && (
        <section style={{ background: 'var(--surface)', padding: '3.5rem 0' }}>
          <div className="container" style={{ maxWidth: '1100px' }}>
            <h2 style={{ fontSize: '1.15rem', color: '#E8DFC8', marginBottom: '1.5rem' }}>
              Topics in This Hub
            </h2>
            <div className="topics-grid">
              {topics.map((topic) => {
                const external = isExternal(topic.linkUrl)
                const isAnchor = topic.linkUrl.startsWith('#')
                return (
                  <a
                    key={topic._key}
                    href={topic.linkUrl}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      padding: '1.25rem',
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      textDecoration: 'none',
                    }}
                  >
                    {topic.topicIcon && (
                      <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>{topic.topicIcon}</div>
                    )}
                    <h3 style={{ fontSize: '0.95rem', color: '#E8DFC8', fontWeight: 700, lineHeight: 1.3 }}>
                      {topic.topicTitle}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(232,223,200,0.55)', lineHeight: 1.6, flex: 1, margin: 0 }}>
                      {topic.topicDescription}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: '#4A8C2A', fontWeight: 600, marginTop: '0.25rem' }}>
                      {isAnchor ? 'Jump to section' : 'Learn more'} &#8594;
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Bed sizing quick reference ── */}
      <section style={{ background: 'var(--bg)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <p style={{ color: '#4A8C2A', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Quick Reference
          </p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#E8DFC8', marginBottom: '2rem' }}>
            Bed Sizing Guide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {bedSizes.map((bed) => (
              <div
                key={bed.name}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderTop: '3px solid #4A8C2A',
                  borderRadius: '8px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <p style={{ color: '#4A8C2A', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>
                  {bed.name}
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#E8DFC8', margin: 0, lineHeight: 1.2 }}>
                  {bed.size}
                </p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(232,223,200,0.45)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
                  Best for:{' '}
                  <span style={{ color: 'rgba(232,223,200,0.7)', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>
                    {bed.bestFor}
                  </span>
                </p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(232,223,200,0.65)', lineHeight: 1.6, margin: 0 }}>
                  {bed.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hub sections + sticky TOC ── */}
      {sections.length > 0 && (
        <section style={{ background: 'var(--surface)', padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1100px' }}>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>

              {/* Main content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {sections.map((section, i) => {
                  const anchor = slugify(section.sectionTitle)
                  const isLast = i === sections.length - 1
                  return (
                    <div
                      key={section._key}
                      id={anchor}
                      style={{
                        paddingBottom: isLast ? 0 : '3.5rem',
                        marginBottom: isLast ? 0 : '3.5rem',
                        borderBottom: isLast ? 'none' : '1px solid var(--border)',
                        scrollMarginTop: '100px',
                      }}
                    >
                      <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', color: '#E8DFC8', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                        {section.sectionTitle}
                      </h2>
                      <div style={{ fontSize: '1rem', color: 'rgba(232,223,200,0.8)', lineHeight: 1.82 }}>
                        <PortableText value={section.sectionBody as Parameters<typeof PortableText>[0]['value']} />
                      </div>
                      {section.relatedLinks?.length > 0 && (
                        <div
                          style={{
                            marginTop: '1.75rem',
                            padding: '1rem 1.25rem',
                            background: 'var(--surface2)',
                            border: '1px solid var(--border)',
                            borderLeft: '3px solid rgba(74,140,42,0.45)',
                            borderRadius: '0 6px 6px 0',
                          }}
                        >
                          <p style={{ fontSize: '0.68rem', color: 'rgba(232,223,200,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.65rem' }}>
                            Related
                          </p>
                          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {section.relatedLinks.map((link) => (
                              <li key={link._key}>
                                <a
                                  href={link.linkUrl}
                                  target={isExternal(link.linkUrl) ? '_blank' : undefined}
                                  rel={isExternal(link.linkUrl) ? 'noopener noreferrer' : undefined}
                                  style={{ color: '#4A8C2A', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}
                                >
                                  {link.linkLabel} &#8594;
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Sticky TOC sidebar — hidden on mobile via CSS class */}
              <div className="toc-sidebar-wrap">
                <TableOfContents items={tocItems} />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ── Soil system reference ── */}
      <section style={{ background: 'var(--bg)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <p style={{ color: '#4A8C2A', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Soil
          </p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#E8DFC8', marginBottom: '1.75rem' }}>
            What Goes In the Bed
          </h2>
          <div className="series-grid">
            {soilLayers.map((layer) => (
              <div
                key={layer.label}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderTop: `3px solid ${layer.accent}`,
                  borderRadius: '8px',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                }}
              >
                <p style={{ color: layer.accent, fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>
                  {layer.label}
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#E8DFC8', margin: 0 }}>
                  {layer.material}
                </p>
                <p style={{ fontSize: '0.78rem', color: layer.accent, fontWeight: 600, margin: 0 }}>
                  {layer.ratio}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(232,223,200,0.65)', lineHeight: 1.6, margin: 0 }}>
                  {layer.desc}
                </p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.88rem', color: 'rgba(232,223,200,0.45)', fontStyle: 'italic', lineHeight: 1.6, borderLeft: '3px solid rgba(74,140,42,0.3)', paddingLeft: '1rem' }}>
            Specific ratios matter less than input quality. Cheap bagged soil produces cheap results.
          </p>
        </div>
      </section>

      {/* ── Seasonal timeline ── */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <p style={{ color: '#4A8C2A', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Zone 5b · Season Schedule
          </p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#E8DFC8', marginBottom: '1.75rem' }}>
            Seasonal Timeline for Denver Raised Beds
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {timeline.map((item) => (
              <div
                key={item.period}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(160px, 200px) 1fr',
                  gap: '1rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  alignItems: 'start',
                }}
              >
                <span style={{ color: '#4A8C2A', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.3px', paddingTop: '0.1rem', lineHeight: 1.4 }}>
                  {item.period}
                </span>
                <span style={{ color: 'rgba(232,223,200,0.8)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {item.action}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/zone-5-denver-gardening-guide" style={{ color: '#4A8C2A', fontSize: '0.88rem', fontWeight: 600 }}>
              Full Zone 5b planting calendar &#8594;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Video library ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <p style={{ color: '#4A8C2A', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            Video Library
          </p>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#E8DFC8', marginBottom: '1.75rem' }}>
            Watch: Raised Bed Systems &amp; Soil
          </h2>
          {raisedBedVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {raisedBedVideos.map((video) => (
                <VideoCard key={video.videoId} {...video} />
              ))}
            </div>
          ) : (
            <div style={{ background: 'var(--surface)', border: '1px dashed rgba(232,223,200,0.15)', borderRadius: '8px', padding: '3rem 2rem', textAlign: 'center' }}>
              <p style={{ color: 'rgba(232,223,200,0.45)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>
                Raised bed build and soil videos — coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#1a3a1a', borderTop: '1px solid rgba(74,140,42,0.25)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '580px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#E8DFC8', marginBottom: '1rem' }}>
            Proof-first gardening from Wheat Ridge.
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(232,223,200,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Every raised bed technique on this page has been tested in Zone 5b Denver conditions.
            Watch the builds and results on YouTube.
          </p>
          <a href="https://youtube.com/@theurbangardeningneighbor" target="_blank" rel="noopener noreferrer" className="btn-green">
            Watch on YouTube
          </a>
        </div>
      </section>
    </>
  )
}
