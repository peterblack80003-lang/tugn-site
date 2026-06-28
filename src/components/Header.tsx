'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

const growItems = [
  { href: '/zone-5-denver-gardening-guide', label: 'Zone 5 Denver Guide' },
  { href: '/raised-bed-command-center', label: 'Raised Bed Command Center' },
  { href: '/tomato-problem-solver', label: 'Tomato Problem Solver' },
]

const desktopLinks = [
  { href: 'https://youtube.com/@theurbangardeningneighbor', label: 'Videos', external: true },
  { href: '/articles', label: 'Articles', external: false },
  { href: '/zone-5-denver-gardening-guide', label: 'Start Here', external: false, isStartHere: true },
  { href: '/shop', label: 'Shop', external: false },
]

const overlayGroups: Array<{
  label: string
  links: Array<{ href: string; label: string; external?: boolean }>
}> = [
  {
    label: 'Learn',
    links: [
      { href: '/zone-5-denver-gardening-guide', label: 'Start Here' },
      { href: '/raised-bed-command-center', label: 'Raised Bed Command Center' },
      { href: '/tomato-problem-solver', label: 'Tomato Problem Solver' },
      { href: '/articles', label: 'Articles' },
    ],
  },
  {
    label: 'Watch',
    links: [
      { href: 'https://youtube.com/@theurbangardeningneighbor', label: 'YouTube Channel', external: true },
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

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [growOpen, setGrowOpen] = useState(false)
  const [bannerText, setBannerText] = useState<string | null>(null)

  const isGrowActive = growItems.some(({ href }) => pathname.startsWith(href))

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
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Seasonal banner — homepage only */}
      {isHome && bannerText && (
        <div
          style={{
            background: '#1a3a1a',
            color: '#E8DFC8',
            textAlign: 'center',
            padding: '9px 1.5rem',
            fontSize: '13px',
            letterSpacing: '2px',
            fontFamily: 'var(--font-inter, Inter, sans-serif)',
            lineHeight: 1.4,
          }}
        >
          {bannerText}
        </div>
      )}

      {/* Nav bar */}
      <nav
        style={{
          background: '#111827',
          borderBottom: '1px solid rgba(232,223,200,0.06)',
          height: '64px',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}
        >
          {/* Wordmark */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-roboto-slab, serif)',
              fontWeight: 900,
              fontSize: '1.35rem',
              color: '#4A8C2A',
              letterSpacing: '2px',
              textDecoration: 'none',
            }}
          >
            TUGN
          </Link>

          {/* Right side: desktop links + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>

            {/* Desktop nav — hidden on mobile */}
            <ul
              className="hidden md:flex"
              style={{ listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', gap: '0.1rem' }}
            >
              {/* ── GROW DROPDOWN ── */}
              <li
                style={{ position: 'relative' }}
                onMouseEnter={() => setGrowOpen(true)}
                onMouseLeave={() => setGrowOpen(false)}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={growOpen}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.4rem 0.7rem',
                    fontSize: '0.875rem',
                    fontWeight: isGrowActive ? 600 : 400,
                    color: isGrowActive ? '#4A8C2A' : 'rgba(232,223,200,0.75)',
                    borderBottom: isGrowActive ? '2px solid #4A8C2A' : '2px solid transparent',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    transition: 'color 0.15s',
                  }}
                >
                  Grow
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: growOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s',
                    }}
                  >
                    <path d="M1 1l4 4 4-4" />
                  </svg>
                </button>

                {/* Dropdown panel — always in DOM, toggled via opacity */}
                <div
                  role="menu"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 1px)',
                    left: 0,
                    minWidth: '236px',
                    background: '#111827',
                    border: '1px solid rgba(232,223,200,0.08)',
                    borderTop: '2px solid #4A8C2A',
                    borderRadius: '0 4px 8px 8px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
                    padding: '0.4rem 0',
                    opacity: growOpen ? 1 : 0,
                    transform: growOpen ? 'translateY(0)' : 'translateY(-6px)',
                    pointerEvents: growOpen ? 'auto' : 'none',
                    transition: 'opacity 0.15s ease, transform 0.15s ease',
                  }}
                >
                  {growItems.map(({ href, label }) => {
                    const active = pathname.startsWith(href)
                    return (
                      <Link
                        key={href}
                        href={href}
                        role="menuitem"
                        onClick={() => setGrowOpen(false)}
                        style={{
                          display: 'block',
                          padding: '0.65rem 1.1rem',
                          fontSize: '0.84rem',
                          color: active ? '#4A8C2A' : 'rgba(232,223,200,0.82)',
                          fontWeight: active ? 600 : 400,
                          borderLeft: active ? '2px solid #4A8C2A' : '2px solid transparent',
                          fontFamily: 'var(--font-inter, Inter, sans-serif)',
                          transition: 'color 0.1s, border-color 0.1s',
                        }}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </div>
              </li>

              {/* ── OTHER DESKTOP LINKS ── */}
              {desktopLinks.map(({ href, label, external, isStartHere }) => {
                const active = !external && (pathname === href || (pathname.startsWith(href) && href !== '/'))

                const linkStyle = isStartHere
                  ? {
                      display: 'block',
                      padding: '0.4rem 0.7rem',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: '#D4601A',
                      borderBottom: '2px solid rgba(212,96,26,0.4)',
                      whiteSpace: 'nowrap' as const,
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      letterSpacing: '0.01em',
                    }
                  : {
                      display: 'block',
                      padding: '0.4rem 0.7rem',
                      fontSize: '0.875rem',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#4A8C2A' : 'rgba(232,223,200,0.75)',
                      borderBottom: active ? '2px solid #4A8C2A' : '2px solid transparent',
                      transition: 'color 0.15s',
                      whiteSpace: 'nowrap' as const,
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    }

                return (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link href={href} style={linkStyle}>
                        {label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* Hamburger — always visible */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.55rem 0.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                marginLeft: '0.5rem',
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: 'block',
                    width: '22px',
                    height: '2px',
                    background: '#E8DFC8',
                    borderRadius: '2px',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#111827',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            padding: '0 1.5rem',
            overflowY: 'auto',
          }}
        >
          {/* Overlay header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '64px',
              flexShrink: 0,
              borderBottom: '1px solid rgba(232,223,200,0.08)',
            }}
          >
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-roboto-slab, serif)',
                fontWeight: 900,
                fontSize: '1.35rem',
                color: '#4A8C2A',
                letterSpacing: '2px',
              }}
            >
              TUGN
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#E8DFC8',
                fontSize: '2rem',
                lineHeight: 1,
                padding: '0.25rem',
              }}
            >
              ×
            </button>
          </div>

          {/* Grouped overlay links */}
          <nav style={{ paddingTop: '1.25rem', flex: 1 }}>
            {overlayGroups.map((group, gi) => (
              <div
                key={group.label}
                style={{ marginBottom: gi < overlayGroups.length - 1 ? '1.5rem' : 0 }}
              >
                {/* Group label */}
                <p
                  style={{
                    color: 'rgba(232,223,200,0.35)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    margin: '0 0 0.1rem',
                    paddingTop: gi > 0 ? '0.5rem' : 0,
                    borderTop: gi > 0 ? '1px solid rgba(232,223,200,0.06)' : 'none',
                  }}
                >
                  {group.label}
                </p>

                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {group.links.map(({ href, label, external }) => {
                    const active = !external && (href === '/' ? pathname === '/' : pathname.startsWith(href))
                    const linkStyle = {
                      display: 'block',
                      padding: '0.9rem 0',
                      fontSize: 'clamp(1.4rem, 4.5vw, 2rem)',
                      fontFamily: 'var(--font-roboto-slab, serif)',
                      fontWeight: 700,
                      color: active ? '#4A8C2A' : '#E8DFC8',
                      borderBottom: '1px solid rgba(232,223,200,0.06)',
                      transition: 'color 0.15s',
                      letterSpacing: '-0.01em',
                    }
                    return (
                      <li key={href}>
                        {external ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMenuOpen(false)}
                            style={linkStyle}
                          >
                            {label}
                          </a>
                        ) : (
                          <Link
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            style={linkStyle}
                          >
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

          {/* Overlay footer */}
          <div
            style={{
              padding: '2rem 0',
              borderTop: '1px solid rgba(232,223,200,0.06)',
              display: 'flex',
              gap: '1.5rem',
            }}
          >
            <a
              href="https://youtube.com/@theurbangardeningneighbor"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(232,223,200,0.5)', fontSize: '0.85rem' }}
            >
              YouTube
            </a>
            <a
              href="https://facebook.com/theurbangardeningneighbor"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(232,223,200,0.5)', fontSize: '0.85rem' }}
            >
              Facebook
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
