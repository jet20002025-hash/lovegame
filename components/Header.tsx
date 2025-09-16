'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Plus, Gamepad2 } from 'lucide-react'
import AddGameModal from './AddGameModal'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAddGameModal, setShowAddGameModal] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Driving', href: '/category/driving' },
    { name: 'Girls', href: '/category/girls' },
    { name: 'Shooting', href: '/category/shooting' },
    { name: 'Sports', href: '/category/sports' },
    { name: 'Skill', href: '/category/skill' },
    { name: 'Fighting', href: '/category/fighting' },
    { name: 'Thinking', href: '/category/thinking' },
    { name: 'Management', href: '/category/management' },
    { name: 'Strategy', href: '/category/strategy' },
    { name: 'Action', href: '/category/action' },
    { name: 'Fun & Crazy', href: '/category/fun' },
    { name: 'Arcade', href: '/category/arcade' },
    { name: 'Educational', href: '/category/educational' },
  ]

  return (
    <>
      <header className="bg-white/80 backdrop-blur-apple shadow-apple border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-2xl">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-gradient-blue">Love Game Click</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="nav-link text-sm font-medium">
                  More
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-apple-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    {navigation.slice(6).map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* Add Game Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setShowAddGameModal(true)}
                className="btn-gradient flex items-center space-x-2 text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Add Game</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-2xl shadow-apple-lg border border-gray-100 mt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setShowAddGameModal(true)
                    setIsMenuOpen(false)
                  }}
                  className="w-full mt-4 btn-gradient flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Game</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <AddGameModal 
        isOpen={showAddGameModal} 
        onClose={() => setShowAddGameModal(false)} 
      />
    </>
  )
}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Add Game Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddGameModal(true)}
                className="hidden md:flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Game</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-100 py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-primary-500 font-medium transition-colors duration-200 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setShowAddGameModal(true)
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 mx-4"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Game</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Add Game Modal */}
      <AddGameModal 
        isOpen={showAddGameModal} 
        onClose={() => setShowAddGameModal(false)} 
      />
    </>
  )
}
