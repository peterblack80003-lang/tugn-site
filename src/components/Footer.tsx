import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'

const learnLinks = [
  { href: '/zone-5-denver-gardening-guide', label: 'Start Here' },
  { href: '/tomato-masterclass', label: 'Tomato Masterclass' },
  { href: '/raised-bed-command-center', label: 'Raised Bed Command Center' },
  { href: '/articles', label: 'Articles' },
]

export default function Footer() {
  return (
    <footer className="fn-footer fn-page" style={{ background: 'var(--fn-charcoal)', color: '#cfc6b3' }}>
      <div className="fn-container fn-footer-inner">
        <div className="fn-footer-grid">
          <div className="fn-footer-col">
            <Link href="/" className="fn-footer-brand" style={{ color: 'var(--fn-green-bright)' }}>
              TUGN
            </Link>
            <span className="fn-footer-tag">Built. Not bought.</span>
            <span className="fn-footer-fine">Zone 5b · Denver, CO · 5,400 ft</span>
          </div>

          <div className="fn-footer-col">
            <h4>Learn</h4>
            {learnLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </div>

          <div className="fn-footer-col">
            <h4>Watch &amp; follow</h4>
            <a href="https://youtube.com/@theurbangardeningneighbor" target="_blank" rel="noopener noreferrer">
              YouTube channel
            </a>
            <a href="https://facebook.com/theurbangardeningneighbor" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <Link href="/about">About</Link>
            <Link href="/shop">Merch</Link>
            <Link href="/gear">Gear I use</Link>
          </div>

          <div className="fn-footer-col">
            <h4>Seasonal notes</h4>
            <p>One email per season with the Zone 5 planting calendar.</p>
            <NewsletterForm
              id="newsletter-email-footer"
              cta="Join"
              compact
              hideLabel
              fine="No daily drip. Unsubscribe in one click."
            />
          </div>
        </div>

        <div className="fn-footer-bottom">
          <span>
            © {new Date().getFullYear()} The Urban Gardening Neighbor · Red Polo Media LLC ·{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>
          </span>
          <a href="mailto:info@the-urban-gardening-neighbor.com">info@the-urban-gardening-neighbor.com</a>
        </div>
      </div>
    </footer>
  )
}
