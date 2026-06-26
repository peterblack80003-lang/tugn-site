import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/start-here', label: 'Start Here' },
  { href: '/gardening-guides', label: 'Gardening Guides' },
  { href: '/videos', label: 'Videos' },
  { href: '/tomato-masterclass', label: 'Tomato Masterclass' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f1a0f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container" style={{ padding: '3rem 1.5rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Column 1 — Logo + tagline */}
          <div>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-roboto-slab, serif)',
                fontWeight: 900,
                fontSize: '1.5rem',
                color: '#4A8C2A',
                marginBottom: '0.75rem',
              }}
            >
              TUGN
            </Link>
            <p
              style={{
                color: 'rgba(232,223,200,0.55)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                maxWidth: '220px',
              }}
            >
              The Urban Gardening Neighbor
            </p>
            <p
              style={{
                color: 'rgba(232,223,200,0.4)',
                fontSize: '0.8rem',
                marginTop: '0.5rem',
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
                color: 'rgba(232,223,200,0.5)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                fontFamily: 'var(--font-inter, sans-serif)',
              }}
            >
              Pages
            </h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: 'rgba(232,223,200,0.65)',
                      fontSize: '0.9rem',
                      transition: 'color 0.15s',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact + Social */}
          <div>
            <h4
              style={{
                color: 'rgba(232,223,200,0.5)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                fontFamily: 'var(--font-inter, sans-serif)',
              }}
            >
              Connect
            </h4>
            <a
              href="mailto:info@the-urban-gardening-neighbor.com"
              style={{
                display: 'block',
                color: 'rgba(232,223,200,0.65)',
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
                wordBreak: 'break-all',
              }}
            >
              info@the-urban-gardening-neighbor.com
            </a>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <a
                href="https://youtube.com/@theurbangardeningneighbor"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'rgba(232,223,200,0.65)',
                  fontSize: '0.9rem',
                  transition: 'color 0.15s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
                  gap: '0.5rem',
                  color: 'rgba(232,223,200,0.65)',
                  fontSize: '0.9rem',
                  transition: 'color 0.15s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '1.5rem',
            textAlign: 'center',
            color: 'rgba(232,223,200,0.3)',
            fontSize: '0.8rem',
          }}
        >
          © 2026 The Urban Gardening Neighbor
        </div>
      </div>
    </footer>
  )
}
