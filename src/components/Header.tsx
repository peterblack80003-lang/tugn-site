'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

const YT_URL = 'https://youtube.com/@theurbangardeningneighbor'

const primaryLinks: Array<{ href: string; label: string; muted?: boolean; match?: string[] }> = [
  { href: '/zone-5-denver-gardening-guide', label: 'Start Here' },
  { href: '/tomato-masterclass', label: 'Tomatoes', match: ['/tomato-masterclass', '/tomato-problem-solver'] },
  { href: '/raised-bed-command-center', label: 'Systems', match: ['/raised-bed-command-center', '/gardening-guides'] },
  { href: '/tomato-problem-solver', label: 'Fix It' },
  { href: '/articles', label: 'Articles' },
  { href: '/about', label: 'About' },
  { href: '/shop', label: 'Shop', muted: true, match: ['/shop', '/gear'] },
]

const overlayGroups: Array<{
  label: string
  links: Array<{ href: string; label: string; external?: boolean }>
}> = [
  {
    label: 'Learn',
    links: [
      { href: '/zone-5-denver-gardening-guide', label: 'Start Here' },
      { href: '/tomato-masterclass', label: 'Tomato Masterclass' },
      { href: '/raised-bed-command-center', label: 'Garden Systems' },
      { href: '/tomato-problem-solver', label: 'Fix It' },
      { href: '/articles', label: 'Articles' },
    ],
  },
  {
    label: 'The neighbor',
    links: [
      { href: '/about', label: 'About' },
      { href: YT_URL, label: 'YouTube Channel', external: true },
    ],
  },
  {
    label: 'Shop',
    links: [
      { href: '/shop', label: 'Merch' },
      { href: '/gear', label: 'Gear I Use' },
    ],
  },
]

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [bannerText, setBannerText] = useState<string | null>(null)

  // Homepage runs the light Field Notebook palette; interior pages keep the
  // dark chrome until they are migrated.
  const dark = !isHome

  useEffect(() => {
    if (!isHome) return
    client
      .fetch(`*[_type == "siteSettings"][0]{ seasonal_banner_active, seasonal_banner_text }`)
      .then((data: { seasonal_banner_active?: boolean; seasonal_banner_text?: string } | null) => {
        if (data?.seasonal_banner_active && data?.seasonal_banner_text) {
          setBannerText(data.seasonal_banner_text)
        }
      })
      .catch(() => {})
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (href: string, match?: string[]) =>
    (match ?? [href]).some((m) => pathname === m || pathname.startsWith(m + '/'))

  return (
    <header className="fn-header fn-page">
      {isHome && bannerText && (
        <div
          style={{
            background: 'var(--fn-green)',
            color: '#fff',
            textAlign: 'center',
            padding: '9px 1.5rem',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            lineHeight: 1.4,
          }}
        >
          {bannerText}
        </div>
      )}

      <nav className={`fn-nav${dark ? ' fn-nav--dark' : ''}`} aria-label="Primary">
        <div className="fn-container fn-nav-inner">
          <Link href="/" className="fn-wordmark">
            <span className="fn-wordmark-text">TUGN</span>
            <span className="fn-zone-badge">Zone 5b · Denver</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ul className="fn-nav-links">
              {primaryLinks.map(({ href, label, muted, match }) => {
                const active = isActive(href, match)
                const cls = [
                  'fn-nav-link',
                  active ? 'fn-nav-link--active' : '',
                  muted && !active ? 'fn-nav-link--muted' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
                return (
                  <li key={href}>
                    <Link href={href} className={cls} aria-current={active ? 'page' : undefined}>
                      {label}
                    </Link>
                  </li>
                )
              })}
              <li className="fn-nav-yt">
                <a
                  href={YT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fn-btn fn-btn--green fn-btn--sm"
                >
                  <YouTubeIcon />
                  Watch on YouTube
                </a>
              </li>
            </ul>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="fn-burger"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fn-overlay" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="fn-overlay-head">
            <Link href="/" onClick={() => setMenuOpen(false)} className="fn-wordmark">
              <span className="fn-wordmark-text">TUGN</span>
            </Link>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="fn-overlay-close">
              ×
            </button>
          </div>

          <nav aria-label="Menu">
            {overlayGroups.map((group) => (
              <div key={group.label} className="fn-overlay-group">
                <p className="fn-overlay-label">{group.label}</p>
                <ul>
                  {group.links.map(({ href, label, external }) => {
                    const active = !external && isActive(href)
                    const cls = `fn-overlay-link${active ? ' fn-overlay-link--active' : ''}`
                    return (
                      <li key={href}>
                        {external ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            className={cls}
                          >
                            {label}
                          </a>
                        ) : (
                          <Link href={href} onClick={() => setMenuOpen(false)} className={cls}>
                            {label}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="fn-overlay-foot">
            <a href={YT_URL} target="_blank" rel="noopener noreferrer" className="fn-btn fn-btn--green">
              <YouTubeIcon />
              Watch on YouTube
            </a>
            <a
              href="https://facebook.com/theurbangardeningneighbor"
              target="_blank"
              rel="noopener noreferrer"
              className="fn-btn fn-btn--ghost-dark"
            >
              Facebook
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
