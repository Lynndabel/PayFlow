import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WagmiProvider } from './providers/WagmiProvider'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import WalletEventListener from './providers/WalletEventListener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PayFlow - Phone Number Payments',
  description: 'Send crypto using phone numbers. The future of payments is here.',
  keywords: ['crypto', 'payments', 'phone numbers', 'blockchain', 'web3', 'mantle'],
  authors: [{ name: 'PayFlow Team' }],
  creator: 'PayFlow Team',
  openGraph: {
    title: 'PayFlow - Phone Number Payments',
    description: 'Send crypto using phone numbers. The future of payments is here.',
    url: 'https://payflow.com',
    siteName: 'PayFlow',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PayFlow - Phone Number Payments',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PayFlow - Phone Number Payments',
    description: 'Send crypto using phone numbers. The future of payments is here.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white min-h-screen`}>
        <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        <div className="relative z-10">
          <WagmiProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
              <WalletEventListener />
            </main>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#f8fafc',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#f8fafc',
                  },
                },
              }}
            />
          </WagmiProvider>
        </div>
      </body>
    </html>
  )
}