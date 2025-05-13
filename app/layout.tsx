import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Electronics Store App',
  description: 'An electronics store app built with Next.js 13.4 and TypeScript',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
