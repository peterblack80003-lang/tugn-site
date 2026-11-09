import Image from 'next/image'
import Link from 'next/link'
import { getChannelVideos } from '@/lib/youtube'
import { getArticles, getEpisodesBySeries, getSiteSettings } from '@/lib/queries'
import StatsBar from '@/components/StatsBar'
import NewsletterForm from '@/components/NewsletterForm'

const YT_URL = 'https://youtube.com/@theurbangardeningneighbor'
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCg30BKGYJPyTzeVJmBmHnLg'

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

type Pillar = {
  lane: string
  heading: string
  body: string
  cta: string
  href: string
  color: string
  textColor: string
  image: string
  imageAlt: string
}

type ZoneNow = {
  label: string
  headline: string
  body: string
  ctaText: string
  ctaUrl: string
  secondaryText?: string
  secondaryUrl?: string
}

// Fallback when the CMS card is empty. Written for Zone 5 in November.
const ZONE_NOW_DEFAULT: ZoneNow = {
  label: 'Week of Nov 8',
  headline: 'First hard frost is behind us. Winterize the drip before the ground locks up.',
  body:
    'Pull the emitter lines, blow out or drain the manifold, and get leaves or straw on the beds. Fifteen minutes now saves you a cracked timer and a spring full of surprises.',
  ctaText: 'Winterizing checklist',
  ctaUrl: '/raised-bed-command-center',
  secondaryText: 'What to do in December →',
  secondaryUrl: '/zone-5-denver-gardening-guide',
}

function laneFor(title: string): { label: string; color: string } {
  const t = title.toLowerCase()
  if (/crack|curl|fall|drop|wrong|problem|fix|yellow|blight|pest/.test(t)) return { label: 'Fix It', color: 'var(--fn-tomato)' }
  if (/tomato/.test(t)) return { label: 'Tomatoes', color: 'var(--fn-tomato)' }
  if (/bed|soil|drip|water|compost|coir|biochar|system/.test(t)) return { label: 'Systems', color: 'var(--fn-rust-text)' }
  return { label: 'Beginners', color: 'var(--fn-green)' }
}

export default async function HomePage() {
  const [latestVideos, articles, fixItEpisodes, settings] = await Promise.all([
    getChannelVideos(CHANNEL_ID, 3),
    getArticles().catch(() => [] as unknown[]),
    getEpisodesBySeries('Fix It').catch(() => [] as Array<{ youtube_id?: string }>),
    getSiteSettings().catch(() => null),
  ])

  const articleCount = Array.isArray(articles) ? articles.length : 0

  // Most recent Fix It episode when the CMS has one; otherwise the flagship diagnosis video.
  const fixItThumb =
    fixItEpisodes?.[0]?.youtube_id
      ? `https://img.youtube.com/vi/${fixItEpisodes[0].youtube_id}/hqdefault.jpg`
      : 'https://img.youtube.com/vi/j2OYG6gZo6M/hqdefault.jpg'

  const zoneNow: ZoneNow =
    settings?.zone_now_headline && settings?.zone_now_body
      ? {
          label: settings.zone_now_label || '',
          headline: settings.zone_now_headline,
          body: settings.zone_now_body,
          ctaText: settings.zone_now_cta_text || ZONE_NOW_DEFAULT.ctaText,
          ctaUrl: settings.zone_now_cta_url || ZONE_NOW_DEFAULT.ctaUrl,
          secondaryText: settings.zone_now_secondary_text || undefined,
          secondaryUrl: settings.zone_now_secondary_url || undefined,
        }
      : ZONE_NOW_DEFAULT

  const pillars: Pillar[] = [
    {
      lane: 'Tomato Masterclass',
      heading: 'Six episodes. Start to harvest.',
      body: 'Timing, varieties, soil, water, pruning, harvest. Zone 5b specific. No filler.',
      cta: 'Watch the series',
      href: '/tomato-masterclass',
      color: 'var(--fn-tomato)',
      textColor: 'var(--fn-tomato)',
      image: '/fix-it-tomato.webp',
      imageAlt: 'Tomato plant in a cedar raised bed',
    },
    {
      lane: 'Garden Systems',
      heading: 'Beds, soil, water, drip.',
      body: 'The infrastructure decisions that determine whether your garden works or doesn’t.',
      cta: 'Build the system',
      href: '/raised-bed-command-center',
      color: 'var(--fn-rust)',
      textColor: 'var(--fn-rust-text)',
      image: '/garden-wide-full.webp',
      imageAlt: 'Cedar raised beds with drip lines in a backyard garden',
    },
    {
      lane: 'Fix It',
      heading: 'Something’s wrong. Let’s fix it.',
      body: 'Problem-first videos for when the plants aren’t cooperating and you need an answer today.',
      cta: 'Find the fix',
      href: '/tomato-problem-solver',
      color: 'var(--fn-slate)',
      textColor: 'var(--fn-slate-text)',
      image: fixItThumb,
      imageAlt: 'Fix It episode: Tomato Problems Are Not Random',
    },
    {
      lane: 'Gardening for Beginners',
      heading: 'Your first bed, done right.',
      body: 'The mistakes I made so you can skip them. Soil, timing, water, and what to plant first in Zone 5.',
      cta: 'Begin here',
      href: '/zone-5-denver-gardening-guide',
      color: 'var(--fn-green)',
      textColor: 'var(--fn-green)',
      image: '/background.webp',
      imageAlt: 'Raised beds along a stucco wall at golden hour',
    },
  ]

  return (
    <div className="fn-page">
      {/* ── HERO ── */}
      <section className="fn-hero" aria-label="Introduction">
        <Image
          src="/background.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="fn-hero-bg"
          style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div className="fn-hero-scrim-x" aria-hidden="true" />
        <div className="fn-hero-scrim-y" aria-hidden="true" />

        <div className="fn-container fn-hero-inner">
          <div className="fn-hero-copy">
            <span className="fn-hero-kicker">Zone 5b · Denver · Raised beds</span>
            <h1>
              Built.
              <br />
              <span>Not bought.</span>
            </h1>
            <p className="fn-hero-lede">
              Raised beds, drip systems, and tomatoes that actually produce on the Front Range. Fifty
              videos of what I tested, what failed, and what I’d do again.
            </p>
            <div className="fn-hero-actions">
              <Link href="/zone-5-denver-gardening-guide" className="fn-btn fn-btn--green">
                Start with the Zone 5 Guide
                <Arrow />
              </Link>
              <Link href="#tracks" className="fn-btn fn-btn--ghost-light">
                Browse the archive
              </Link>
            </div>
            <p className="fn-hero-fine">No sponsors. No gimmicks. Just what works at 5,400 feet.</p>
          </div>

          <div className="fn-hero-badge">
            <Image
              src="/tugn-logo-transparent.png"
              alt="The Urban Gardening Neighbor badge"
              width={340}
              height={340}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsBar articleCount={articleCount || undefined} />

      {/* ── ZONE 5 NOW + START HERE ── */}
      <section aria-label="Zone 5 right now">
        <div className="fn-container fn-now-grid">
          <article className="fn-card fn-now">
            <div className="fn-now-head">
              <span className="fn-eyebrow">Zone 5 right now</span>
              {zoneNow.label && <span className="fn-now-date">{zoneNow.label}</span>}
            </div>
            <h2>{zoneNow.headline}</h2>
            <p>{zoneNow.body}</p>
            <div className="fn-now-actions">
              <Link href={zoneNow.ctaUrl} className="fn-arrow-link">
                {zoneNow.ctaText}
                <Arrow />
              </Link>
              {zoneNow.secondaryText && zoneNow.secondaryUrl && (
                <Link href={zoneNow.secondaryUrl} style={{ fontWeight: 600, color: 'var(--fn-ink-muted)' }}>
                  {zoneNow.secondaryText}
                </Link>
              )}
            </div>
          </article>

          <article className="fn-start">
            <span className="fn-eyebrow fn-eyebrow--light">New to the channel?</span>
            <h2>Start with the Zone 5 Denver Guide</h2>
            <p>
              Frost dates, what grows, what doesn’t, and why raised beds change everything on the Front
              Range. Read it once and the rest of the site makes sense.
            </p>
            <div className="fn-start-cta">
              <Link href="/zone-5-denver-gardening-guide" className="fn-btn fn-btn--green">
                Read the guide
                <Arrow />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section id="tracks" className="fn-section" aria-label="Where to start">
        <div className="fn-container">
          <div className="fn-section-head">
            <div>
              <span className="fn-eyebrow">What we grow here</span>
              <h2>Where do you want to start?</h2>
            </div>
            <p className="fn-section-lede">
              Four tracks. Each one is a complete transformation, start to finish. Pick the one that
              matches what’s happening in your beds.
            </p>
          </div>

          <div className="fn-pillars">
            {pillars.map((p) => (
              <article
                key={p.lane}
                className="fn-card fn-pillar"
                style={{ ['--pillar' as string]: p.color, ['--pillar-text' as string]: p.textColor }}
              >
                <div className="fn-pillar-media">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="fn-pillar-body">
                  <span className="fn-pillar-lane">{p.lane}</span>
                  <h3>{p.heading}</h3>
                  <p>{p.body}</p>
                  <Link href={p.href} className="fn-arrow-link">
                    {p.cta}
                    <Arrow />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="fn-newsletter" aria-label="Newsletter">
        <div className="fn-container fn-newsletter-inner">
          <div className="fn-newsletter-copy">
            <span className="fn-eyebrow">The Neighbor’s Notes</span>
            <h2>One email per season. What to do in Zone 5 right now.</h2>
            <p>
              Frost dates, planting windows, and the one task that matters this month. Comes with the
              Zone 5 planting calendar. No daily drip, no upsells.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      {/* ── RECENT EPISODES ── */}
      <section className="fn-section" aria-label="Recent episodes" style={{ paddingTop: '4.5rem' }}>
        <div className="fn-container">
          <div className="fn-section-head">
            <div>
              <span className="fn-eyebrow">From the channel</span>
              <h2>Recent episodes</h2>
            </div>
            <div className="fn-section-links">
              <a href={YT_URL} target="_blank" rel="noopener noreferrer" className="fn-arrow-link">
                All videos <Arrow />
              </a>
              <Link href="/articles" className="fn-arrow-link">
                All {articleCount || ''} articles <Arrow />
              </Link>
            </div>
          </div>

          {latestVideos.length > 0 ? (
            <div className="fn-episodes">
              {latestVideos.map((v) => {
                const lane = laneFor(v.title)
                return (
                  <a
                    key={v.videoId}
                    href={`https://www.youtube.com/watch?v=${v.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fn-card fn-episode"
                  >
                    <div className="fn-episode-media">
                      <Image
                        src={v.thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 2,
                          textTransform: 'uppercase',
                          color: '#fff',
                          background: lane.color,
                          padding: '5px 9px',
                          borderRadius: 4,
                        }}
                      >
                        {lane.label}
                      </span>
                      <div className="fn-episode-play" aria-hidden="true">
                        <span>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="#1b2129">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="fn-episode-body">
                      <h3>{v.title}</h3>
                      <span className="fn-episode-meta">
                        {new Date(v.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          ) : (
            <div className="fn-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--fn-ink-muted)', marginBottom: '1.25rem' }}>
                New episodes land on YouTube first.
              </p>
              <a href={YT_URL} target="_blank" rel="noopener noreferrer" className="fn-btn fn-btn--green">
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="fn-about" aria-label="About the neighbor">
        <div className="fn-container fn-about-inner">
          <div className="fn-about-media">
            <Image
              src="/garden-wide-full.webp"
              alt="The TUGN raised-bed garden in Denver"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            />
          </div>
          <div className="fn-about-copy">
            <span className="fn-eyebrow">Your neighbor</span>
            <h2>I spent thirty years building systems that couldn’t fail. Then I tried to grow a tomato.</h2>
            <p>
              Everything here comes from my own raised beds in the Denver metro, Zone 5b, 5,400 feet. I
              test it, I break it, I show you what actually held up. This is the mentorship I wish I’d
              had when I started.
            </p>
            <Link href="/about" className="fn-arrow-link" style={{ marginTop: 4 }}>
              Meet the neighbor
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MERCH ── */}
      <section aria-label="Gear and merch">
        <div className="fn-container fn-merch-inner">
          <div className="fn-merch-copy">
            <span className="fn-eyebrow">TUGN merch</span>
            <h2>Gear and merch from the garden.</h2>
            <p>
              Stuff I’d actually use or wear. Garden gear, Gus, and print-on-demand products. Built.
              Not bought.
            </p>
            <div className="fn-merch-actions">
              <a
                href="https://the-urban-gardening-neighbor-shop.myshopify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fn-btn fn-btn--ink"
              >
                Visit the shop
              </a>
              <Link href="/gear" className="fn-btn fn-btn--ghost-dark">
                Gear I use
              </Link>
            </div>
          </div>
          <div className="fn-merch-tiles">
            <div className="fn-tile fn-tile--red">
              <Image src="/tugn-logo-transparent.png" alt="TUGN badge" width={300} height={300} />
              <span className="fn-tile-label">The badge</span>
            </div>
            <div className="fn-tile fn-tile--photo">
              <Image
                src="/garden-wide-full.webp"
                alt="Cedar raised beds in the TUGN garden"
                fill
                sizes="(max-width: 768px) 50vw, 220px"
                style={{ objectFit: 'cover', objectPosition: 'left center' }}
              />
              <span className="fn-tile-label">From the beds</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
