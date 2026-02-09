import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { OSINTLayout } from '@/components/layout/OSINTLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UIO9 - OSINT Investigation Tool',
  description: 'Advanced web-based OSINT tool for digital investigation and intelligence gathering',
  keywords: ['OSINT', 'Investigation', 'Digital Forensics', 'Cyber Security', 'Intelligence'],
  robots: {
    index: false,
    follow: false,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-osint-bg text-osint-text min-h-screen`}>
        <OSINTLayout>
          {children}
        </OSINTLayout>
        
        {/* Footer with legal requirements */}
        <footer className="border-t border-osint-border bg-osint-panel mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-osint-muted text-sm">
                🔐 Developed By Sherlock  
                📎 Telegram: @tx_5w  
                📷 Instagram: @j.86vb  
                🎥 TikTok: @default_room105
              </div>
              <div className="text-osint-muted text-xs">
                © {new Date().getFullYear()} UIO9 OSINT Tool - All Rights Reserved
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}