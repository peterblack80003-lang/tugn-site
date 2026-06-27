'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { client } from '@/lib/sanity'

const desktopLinks = [
  { href: '/start-here', label: 'Start Here' },
  { href: '/tomato-masterclass', label: 'Masterclass' },
  { href: '/gardening-guides', label: 'Guides' },
  { href: '/zone-5-denver-gardening-guide', label: 'Zone 5 Guide' },
  { href: '/videos', label: 'Videos' },
]

const overlayLinks = [
  { href: '/start-here', label: 'Start Here' },
  { href: '/tomato-masterclass', label: 'Masterclass' },
  { href: '/gardening-guides', label: 'Guides' },
  { href: '/zone-5-denver-gardening-guide', label: 'Zone 5 Guide' },
  { href: '/videos', label: 'Videos' },
  { href: '/shop', label: 'Shop' },
  { href: '/gear', label: 'Gear I Use' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [bannerText, setBannerText] = useState<string | null>(null)

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
            {/* Desktop nav items — hidden on mobile */}
            <ul
              className="hidden md:flex"
              style={{ listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', gap: '0.1rem' }}
            >
              {desktopLinks.map(({ href, label }) => {
                const active = pathname === href || (href !== '/' && pathname.startsWith(href))
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      style={{
                        display: 'block',
                        padding: '0.4rem 0.7rem',
                        fontSize: '0.875rem',
                        fontWeight: active ? 600 : 400,
                        color: active ? '#4A8C2A' : 'rgba(232,223,200,0.75)',
                        borderBottom: active ? '2px solid #4A8C2A' : '2px solid transparent',
                        transition: 'color 0.15s',
                        whiteSpace: 'nowrap',
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      }}
                    >
                      {label}
                    </Link>
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

          {/* Overlay links */}
          <nav style={{ paddingTop: '1.5rem', flex: 1 }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {overlayLinks.map(({ href, label }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display: 'block',
                        padding: '1.1rem 0',
                        fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                        fontFamily: 'var(--font-roboto-slab, serif)',
                        fontWeight: 700,
                        color: active ? '#4A8C2A' : '#E8DFC8',
                        borderBottom: '1px solid rgba(232,223,200,0.06)',
                        transition: 'color 0.15s',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
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
