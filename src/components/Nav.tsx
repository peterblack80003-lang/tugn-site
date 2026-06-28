'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const growItems = [
  { href: '/zone-5-denver-gardening-guide', label: 'Zone 5 Denver Guide' },
  { href: '/raised-bed-command-center', label: 'Raised Bed Command Center' },
  { href: '/tomato-problem-solver', label: 'Tomato Problem Solver' },
]

const desktopLinks = [
  { href: '/videos', label: 'Videos' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
]

const mobileLinks = [
  { href: '/zone-5-denver-gardening-guide', label: 'Start Here', isOrange: true },
  { href: '/raised-bed-command-center', label: 'Raised Bed Command Center', isOrange: false },
  { href: '/tomato-problem-solver', label: 'Tomato Problem Solver', isOrange: false },
  { href: '/videos', label: 'Videos', isOrange: false },
  { href: '/shop', label: 'Shop', isOrange: false },
  { href: '/gear', label: 'Gear', isOrange: false },
]

export default function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [growOpen, setGrowOpen] = useState(false)

  const isStartHereActive = pathname.startsWith('/zone-5-denver-gardening-guide')
  const isGrowActive = growItems.some(({ href }) => pathname.startsWith(href))

  return (
    <nav
      style={{
        background: '#1A2535',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-roboto-slab, serif)',
            fontWeight: 900,
            fontSize: '1.35rem',
            color: '#4A8C2A',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          TUGN
        </Link>

        {/* Desktop links — hidden on mobile via Tailwind */}
        <ul
          className="hidden md:flex"
          style={{
            gap: '0.15rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
        >
          {/* ── START HERE (orange accent) ── */}
          <li>
            <Link
              href="/zone-5-denver-gardening-guide"
              style={{
                display: 'block',
                padding: '0.4rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#D4601A',
                borderBottom: isStartHereActive
                  ? '2px solid #D4601A'
                  : '2px solid rgba(212,96,26,0.35)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}
            >
              Start Here
            </Link>
          </li>

          {/* ── GROW (hover dropdown) ── */}
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
                padding: '0.4rem 0.65rem',
                fontSize: '0.85rem',
                fontWeight: isGrowActive ? 600 : 400,
                color: isGrowActive ? '#4A8C2A' : 'rgba(232,223,200,0.8)',
                borderBottom: isGrowActive
                  ? '2px solid #4A8C2A'
                  : '2px solid transparent',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
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
                minWidth: '232px',
                background: '#1A2535',
                border: '1px solid rgba(255,255,255,0.1)',
                borderTop: '2px solid #4A8C2A',
                borderRadius: '0 4px 8px 8px',
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
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
                      borderLeft: active
                        ? '2px solid #4A8C2A'
                        : '2px solid transparent',
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
          {desktopLinks.map(({ href, label }) => {
            const active =
              pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    display: 'block',
                    padding: '0.4rem 0.65rem',
                    fontSize: '0.85rem',
                    fontWeight: active ? 600 : 400,
                    color: active ? '#4A8C2A' : 'rgba(232,223,200,0.8)',
                    borderBottom: active
                      ? '2px solid #4A8C2A'
                      : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger — hidden on md+ */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                background: '#E8DFC8',
                borderRadius: '2px',
                transition: 'transform 0.2s, opacity 0.2s',
                transform:
                  mobileOpen && i === 0
                    ? 'translateY(7px) rotate(45deg)'
                    : mobileOpen && i === 2
                    ? 'translateY(-7px) rotate(-45deg)'
                    : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: '#1A2535',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '0.75rem 0 1.25rem',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {mobileLinks.map(({ href, label, isOrange }) => {
              const active =
                pathname === href || (href !== '/' && pathname.startsWith(href))
              const accent = isOrange ? '#D4601A' : '#4A8C2A'

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.8rem 1.5rem',
                      fontWeight: active || isOrange ? 600 : 400,
                      color: active
                        ? accent
                        : isOrange
                        ? '#D4601A'
                        : 'rgba(232,223,200,0.85)',
                      borderLeft: active
                        ? `3px solid ${accent}`
                        : '3px solid transparent',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      fontSize: isOrange ? '0.95rem' : '0.9rem',
                      letterSpacing: isOrange ? '0.01em' : 'normal',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}
