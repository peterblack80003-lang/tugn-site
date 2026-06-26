'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/start-here', label: 'Start Here' },
  { href: '/gardening-guides', label: 'Gardening Guides' },
  { href: '/videos', label: 'Videos' },
  { href: '/tomato-masterclass', label: 'Tomato Masterclass' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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

        {/* Desktop links */}
        <ul
          style={{
            display: 'flex',
            gap: '0.25rem',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href))
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
                    borderBottom: active ? '2px solid #4A8C2A' : '2px solid transparent',
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
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
          aria-label="Toggle menu"
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
                  open && i === 0
                    ? 'translateY(7px) rotate(45deg)'
                    : open && i === 2
                    ? 'translateY(-7px) rotate(-45deg)'
                    : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            background: '#1A2535',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '1rem 0',
          }}
          className="md:hidden"
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1.5rem',
                      fontWeight: active ? 600 : 400,
                      color: active ? '#4A8C2A' : 'rgba(232,223,200,0.85)',
                      borderLeft: active ? '3px solid #4A8C2A' : '3px solid transparent',
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
