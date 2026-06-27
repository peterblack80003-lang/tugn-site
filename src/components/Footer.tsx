import Link from 'next/link'

const navLinks = [
  { href: '/start-here', label: 'Start Here' },
  { href: '/tomato-masterclass', label: 'Masterclass' },
  { href: '/gardening-guides', label: 'Guides' },
  { href: '/zone-5-denver-gardening-guide', label: 'Zone 5 Guide' },
  { href: '/raised-bed-command-center', label: 'Raised Bed Hub' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#111827',
        borderTop: '1px solid rgba(232,223,200,0.08)',
      }}
    >
      <div className="container" style={{ padding: '4rem 1.5rem 0' }}>
        <div className="footer-grid">
          {/* Column 1 — Wordmark + tagline */}
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-roboto-slab, serif)',
                fontWeight: 900,
                fontSize: '1.6rem',
                color: '#4A8C2A',
                letterSpacing: '2px',
                marginBottom: '0.6rem',
              }}
            >
              TUGN
            </Link>
            <p
              style={{
                color: 'rgba(232,223,200,0.5)',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                maxWidth: '200px',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontStyle: 'italic',
              }}
            >
              Built. Not bought.
            </p>
          </div>

          {/* Column 2 — Nav links */}
          <div>
            <h4
              style={{
                color: 'rgba(232,223,200,0.4)',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
              }}
            >
              Pages
            </h4>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
            >
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: 'rgba(232,223,200,0.7)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      transition: 'color 0.15s',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Social + contact */}
          <div>
            <h4
              style={{
                color: 'rgba(232,223,200,0.4)',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
              }}
            >
              Connect
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href="https://youtube.com/@theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'rgba(232,223,200,0.7)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  transition: 'color 0.15s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.8 15.6V8.4l6.3 3.6-6.3 3.6z" />
                </svg>
                YouTube
              </a>
              <a
                href="https://facebook.com/theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  color: 'rgba(232,223,200,0.7)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  transition: 'color 0.15s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
                </svg>
                Facebook
              </a>
              <a
                href="mailto:info@the-urban-gardening-neighbor.com"
                style={{
                  color: 'rgba(232,223,200,0.5)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  wordBreak: 'break-all',
                }}
              >
                info@the-urban-gardening-neighbor.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(232,223,200,0.06)',
          marginTop: '3rem',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div className="container footer-bottom">
          <span
            style={{
              color: 'rgba(232,223,200,0.3)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            © 2026 The Urban Gardening Neighbor · Red Polo Media LLC
          </span>
          <span
            style={{
              color: 'rgba(232,223,200,0.3)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            Zone 5b · Denver, CO
          </span>
        </div>
      </div>
    </footer>
  )
}
