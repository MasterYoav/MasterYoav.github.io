import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yoav - Interactive Portfolio',
  description: 'Full-Stack Developer & Creative Technologist - Building innovative digital experiences with code and creativity',
  keywords: ['portfolio', 'developer', 'full-stack', 'react', 'next.js', 'javascript', 'typescript'],
  authors: [{ name: 'Yoav' }],
  creator: 'Yoav',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-portfolio-url.com',
    title: 'Yoav - Interactive Portfolio',
    description: 'Full-Stack Developer & Creative Technologist - Building innovative digital experiences',
    siteName: 'Yoav Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yoav - Interactive Portfolio',
    description: 'Full-Stack Developer & Creative Technologist',
    creator: '@your-twitter-handle',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}