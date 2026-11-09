import type { Metadata } from 'next'
import { Roboto_Slab, Source_Sans_3 } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-roboto-slab',
  display: 'swap',
})

// Body face for the Field Notebook direction. Kept on the --font-inter
// variable so every existing page picks it up without edits.
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'The Urban Gardening Neighbor',
    template: '%s | The Urban Gardening Neighbor',
  },
  description:
    'Zone 5b raised beds, drip systems, and tomatoes that actually produce. Real gardening — built, not bought.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://the-urban-gardening-neighbor.com'
  ),
  openGraph: {
    siteName: 'The Urban Gardening Neighbor',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSlab.variable} ${sourceSans.variable}`}
    >
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: '#111827',
          color: '#E8DFC8',
        }}
      >
        <Header />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
