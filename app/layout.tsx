import Header from '../components/Header'
import Footer from '../components/Footer'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://lovegame.click'),
  title: {
    default: 'Love Game Click - Ultimate Gaming Hub',
    template: '%s | Love Game Click'
  },
  description: 'Play free online games at Love Game Click. Discover amazing puzzle, action, strategy, and word games. No downloads required - just click and play!',
  keywords: ['free online games', 'puzzle games', 'action games', 'strategy games', 'word games', 'arcade games'],
  authors: [{ name: 'Love Game Click Team' }],
  creator: 'Love Game Click',
  publisher: 'Love Game Click',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lovegame.click',
    siteName: 'Love Game Click',
    title: 'Love Game Click - Ultimate Gaming Hub',
    description: 'Play free online games at Love Game Click. Discover amazing puzzle, action, strategy, and word games.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Love Game Click - Ultimate Gaming Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Love Game Click - Ultimate Gaming Hub',
    description: 'Play free online games at Love Game Click. Discover amazing puzzle, action, strategy, and word games.',
    images: ['/images/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://lovegame.click" />
        {/* <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#007AFF" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7208260866318884" crossOrigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-7208260866318884" />
        <meta name="google-site-verification" content="google.com, pub-7208260866318884, DIRECT, f08c47fec0942fa0" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#34C759',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#FF3B30',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
