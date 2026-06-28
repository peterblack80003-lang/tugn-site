import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for The Urban Gardening Neighbor, operated by Red Polo Media LLC.',
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '1.15rem',
  color: '#E8DFC8',
  marginBottom: '0.75rem',
  marginTop: '2.5rem',
}

const bodyStyle: React.CSSProperties = {
  fontSize: '1rem',
  lineHeight: 1.8,
  color: 'rgba(232,223,200,0.78)',
  marginBottom: '0.75rem',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0f1a0f 0%, #1A2535 100%)',
          paddingTop: '120px',
          paddingBottom: '60px',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
              color: '#E8DFC8',
              marginBottom: '0.75rem',
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              color: '#4A8C2A',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            Last updated: June 28, 2026
          </p>
        </div>
      </section>

      {/* Policy content */}
      <section style={{ background: 'var(--bg)', padding: '4rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>

          <p style={bodyStyle}>
            This Privacy Policy describes how The Urban Gardening Neighbor
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and handles
            information when you visit{' '}
            <a
              href="https://www.the-urban-gardening-neighbor.com"
              style={{ color: '#4A8C2A' }}
            >
              www.the-urban-gardening-neighbor.com
            </a>{' '}
            (the &ldquo;Site&rdquo;).
          </p>

          {/* 1 */}
          <h2 style={sectionHeadingStyle}>1. Who We Are</h2>
          <p style={bodyStyle}>
            The Urban Gardening Neighbor is operated by <strong style={{ color: '#E8DFC8' }}>Red Polo Media LLC</strong>,
            a Colorado limited liability company.
          </p>
          <p style={bodyStyle}>
            Contact:{' '}
            <a href="mailto:info@the-urban-gardening-neighbor.com" style={{ color: '#4A8C2A' }}>
              info@the-urban-gardening-neighbor.com
            </a>
          </p>

          {/* 2 */}
          <h2 style={sectionHeadingStyle}>2. Information We Collect</h2>
          <p style={bodyStyle}>
            <strong style={{ color: '#E8DFC8' }}>Website analytics.</strong>{' '}
            We use standard web analytics tools to collect aggregate, non-personally-identifiable
            data such as page views, session duration, and traffic sources. This data is used
            solely to understand how visitors use the Site and to improve content. No personally
            identifiable information is collected through analytics.
          </p>
          <p style={bodyStyle}>
            <strong style={{ color: '#E8DFC8' }}>Contact form submissions.</strong>{' '}
            If you voluntarily submit your email address via a contact form, we collect and
            store that address only to respond to your inquiry. We do not add you to any
            mailing list without explicit consent.
          </p>
          <p style={bodyStyle}>
            <strong style={{ color: '#E8DFC8' }}>Payment information.</strong>{' '}
            We do not collect or store any payment information on this Site. Any purchases
            made through our Shopify store are governed by Shopify&rsquo;s privacy policy and
            payment processing systems.
          </p>

          {/* 3 */}
          <h2 style={sectionHeadingStyle}>3. Facebook and Meta Platform</h2>
          <p style={bodyStyle}>
            This Site uses the Facebook Graph API to publish content to the official TUGN
            Facebook page (@theurbangardeningneighbor). This integration is used exclusively
            by the site operator to post content to our own page — it does not involve any
            collection, storage, or processing of Facebook user data.
          </p>
          <p style={bodyStyle}>
            We do not use Facebook Login, Facebook Pixel, or any other Meta product that
            collects information from visitors to this Site. We do not receive, access, or
            store any information about Facebook users through this integration.
          </p>

          {/* 4 */}
          <h2 style={sectionHeadingStyle}>4. YouTube</h2>
          <p style={bodyStyle}>
            This Site displays YouTube video content via the YouTube Data API. We do not
            collect or store any data about viewers of that content. Watching embedded or
            linked YouTube videos is subject to{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#4A8C2A' }}
            >
              Google&rsquo;s Privacy Policy
            </a>
            .
          </p>

          {/* 5 */}
          <h2 style={sectionHeadingStyle}>5. Cookies</h2>
          <p style={bodyStyle}>
            This Site uses only the minimal cookies required for basic site functionality
            (such as session management). We do not use advertising cookies, tracking pixels,
            or third-party behavioral targeting cookies. You may disable cookies in your
            browser settings; doing so may affect some site functionality.
          </p>

          {/* 6 */}
          <h2 style={sectionHeadingStyle}>6. Third-Party Services</h2>
          <p style={bodyStyle}>
            The Site relies on the following third-party services, each of which has its
            own privacy policy:
          </p>
          <ul
            style={{
              ...bodyStyle,
              paddingLeft: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <li>
              <strong style={{ color: '#E8DFC8' }}>Vercel</strong> — website hosting and
              deployment infrastructure.
            </li>
            <li>
              <strong style={{ color: '#E8DFC8' }}>Sanity</strong> — headless content
              management system used to store and serve site content.
            </li>
            <li>
              <strong style={{ color: '#E8DFC8' }}>Shopify</strong> — e-commerce platform
              for our merchandise store. Purchases made through the Shopify store are
              governed by Shopify&rsquo;s own privacy policy.
            </li>
          </ul>
          <p style={{ ...bodyStyle, marginTop: '0.75rem' }}>
            We encourage you to review the privacy policies of these services for information
            about how they handle your data.
          </p>

          {/* 7 */}
          <h2 style={sectionHeadingStyle}>7. Data Retention and Sharing</h2>
          <p style={bodyStyle}>
            We do not sell, rent, or share personal information with third parties for
            marketing or advertising purposes. Email addresses collected via contact forms
            are used only to respond to the inquiry for which they were submitted and are
            retained only as long as necessary for that purpose.
          </p>
          <p style={bodyStyle}>
            We may disclose information if required by law or to protect the rights and
            safety of Red Polo Media LLC or others.
          </p>

          {/* 8 */}
          <h2 style={sectionHeadingStyle}>8. Children&rsquo;s Privacy</h2>
          <p style={bodyStyle}>
            This Site is not directed to children under the age of 13, and we do not
            knowingly collect personal information from children. If you believe a child
            has submitted personal information to us, please contact us so we can delete it.
          </p>

          {/* 9 */}
          <h2 style={sectionHeadingStyle}>9. Changes to This Policy</h2>
          <p style={bodyStyle}>
            We may update this Privacy Policy from time to time. Changes will be posted
            on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the Site
            after any changes constitutes acceptance of the revised policy.
          </p>

          {/* 10 */}
          <h2 style={sectionHeadingStyle}>10. Contact Us</h2>
          <p style={bodyStyle}>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div
            style={{
              marginTop: '1rem',
              padding: '1.5rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
          >
            <p style={{ ...bodyStyle, marginBottom: '0.25rem' }}>
              <strong style={{ color: '#E8DFC8' }}>Red Polo Media LLC</strong>
            </p>
            <p style={{ ...bodyStyle, marginBottom: '0.25rem' }}>
              The Urban Gardening Neighbor
            </p>
            <p style={{ ...bodyStyle, marginBottom: 0 }}>
              <a
                href="mailto:info@the-urban-gardening-neighbor.com"
                style={{ color: '#4A8C2A' }}
              >
                info@the-urban-gardening-neighbor.com
              </a>
            </p>
          </div>

        </div>
      </section>
    </>
  )
}
