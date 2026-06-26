import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with The Urban Gardening Neighbor.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #111b29 0%, #1A2535 100%)',
          paddingTop: '120px',
          paddingBottom: '60px',
        }}
      >
        <div className="container" style={{ maxWidth: '600px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              color: '#E8DFC8',
              marginBottom: '0.75rem',
            }}
          >
            Contact
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(232,223,200,0.65)', lineHeight: 1.7 }}>
            Questions, feedback, or just want to say your tomatoes are thriving?
          </p>
        </div>
      </section>

      {/* Contact info */}
      <section style={{ background: 'var(--bg)', padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Email */}
            <div>
              <h2 style={{ fontSize: '0.75rem', color: 'rgba(232,223,200,0.5)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: 'var(--font-inter, sans-serif)' }}>
                Email
              </h2>
              <a
                href="mailto:info@the-urban-gardening-neighbor.com"
                style={{
                  color: '#4A8C2A',
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  wordBreak: 'break-all',
                }}
              >
                info@the-urban-gardening-neighbor.com
              </a>
            </div>

            {/* Social */}
            <div>
              <h2 style={{ fontSize: '0.75rem', color: 'rgba(232,223,200,0.5)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'var(--font-inter, sans-serif)' }}>
                Follow
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href="https://youtube.com/@theurbangardeningneighbor"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'rgba(232,223,200,0.75)',
                    fontSize: '1rem',
                    transition: 'color 0.15s',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1C4.5 20.4 12 20.4 12 20.4s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.8 15.6V8.4l6.3 3.6-6.3 3.6z" />
                  </svg>
                  YouTube — @theurbangardeningneighbor
                </a>
                <a
                  href="https://facebook.com/theurbangardeningneighbor"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: 'rgba(232,223,200,0.75)',
                    fontSize: '1rem',
                    transition: 'color 0.15s',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z" />
                  </svg>
                  Facebook — theurbangardeningneighbor
                </a>
              </div>
            </div>

            {/* Note about form */}
            <p
              style={{
                fontSize: '0.82rem',
                color: 'rgba(232,223,200,0.35)',
                fontStyle: 'italic',
                borderTop: '1px solid var(--border)',
                paddingTop: '1.25rem',
              }}
            >
              Contact form coming in Session 8. For now, email is the fastest way to reach us.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
