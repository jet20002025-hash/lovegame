import Link from 'next/link'
import { Gamepad2, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Gamepad2 className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold">Love Game Click</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The ultimate destination for free online games. Play, enjoy, and discover amazing games 
              across all categories. No downloads required - just click and play!
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Made with love for gamers worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/puzzle" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Puzzle Games
                </Link>
              </li>
              <li>
                <Link href="/category/action" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Action Games
                </Link>
              </li>
              <li>
                <Link href="/category/strategy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Strategy Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Love Game Click. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/sitemap.xml" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Sitemap
              </Link>
              <Link href="/rss.xml" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
