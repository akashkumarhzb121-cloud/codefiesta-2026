import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const SITE_URL = 'https://codefiesta.example.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Codefiesta 2026 — National Coding & Innovation Hackathon | GIT Jaipur',
    template: '%s | Codefiesta 2026',
  },
  description:
    'Codefiesta 2026 is a 1-day national hackathon hosted by GIT Jaipur. Build across AI, cybersecurity, semiconductors, IoT, greentech and more. Win prizes up to ₹30,000, certificates and goodies.',
  keywords: [
    'Codefiesta 2026',
    'GIT Jaipur hackathon',
    'college coding competition',
    'hackathon India',
    'AI hackathon',
    'student hackathon',
    'coding fest',
  ],
  authors: [{ name: 'GIT Jaipur' }],
  creator: 'GIT Jaipur',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Codefiesta 2026 — National Coding & Innovation Hackathon',
    description:
      'A 1-day national hackathon by GIT Jaipur. 25+ problem statements, cash prizes up to ₹30,000, and 9 focus tracks spanning AI to Quantum.',
    siteName: 'Codefiesta 2026',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codefiesta 2026 — National Coding & Innovation Hackathon',
    description:
      'A 1-day national hackathon by GIT Jaipur. 25+ problem statements, cash prizes up to ₹30,000, and 9 focus tracks.',
  },
  robots: { index: true, follow: true },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
