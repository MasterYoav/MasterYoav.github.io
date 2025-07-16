import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Portfolio',
  description: 'Interactive and modern developer portfolio showcasing projects and skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gradient-to-br from-purple-900 via-red-800 to-orange-700 text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
