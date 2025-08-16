import type { Metadata } from 'next'
import { Manrope, Instrument_Serif } from 'next/font/google'
import '../styles/globals.css'
import { SEOOptimizer } from '@/components/SEOOptimizer'

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Bokario - Synlighet. Rykte. Bokningar.',
    template: '%s | Bokario'
  },
  description: 'Vi sköter kartan, omdömena och bokningarna åt dig – mätbara resultat utan krångel.',
  keywords: ['google maps', 'recensioner', 'bokningar', 'digital marknadsföring', 'stockholm'],
  authors: [{ name: 'Bokario' }],
  creator: 'Bokario',
  publisher: 'Bokario',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bokario.se'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://bokario.se',
    siteName: 'Bokario',
    title: 'Bokario - Synlighet. Rykte. Bokningar.',
    description: 'Vi sköter kartan, omdömena och bokningarna åt dig – mätbara resultat utan krångel.',
    images: [
      {
        url: '/brand/og/home.png',
        width: 1200,
        height: 630,
        alt: 'Bokario - Synlighet. Rykte. Bokningar.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bokario - Synlighet. Rykte. Bokningar.',
    description: 'Vi sköter kartan, omdömena och bokningarna åt dig – mätbara resultat utan krångel.',
    images: ['/brand/og/home.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" className={`${manrope.variable} ${instrumentSerif.variable}`}>
      <SEOOptimizer
        data={{
          title: 'Bokario - Automatisera din verksamhet med smarta lösningar',
          description: 'Vi hjälper företag att automatisera bokningar, optimera Maps-synlighet och bygga förtroende med recensioner. Boka gratis demo idag!',
          keywords: ['bokningssystem', 'maps optimering', 'recensioner', 'automatisering', 'företag'],
          ogImage: '/brand/og/home.png',
          ogType: 'website'
        }}
      >
        <body className="font-sans antialiased">
          {children}
        </body>
      </SEOOptimizer>
    </html>
  )
}
