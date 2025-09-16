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
    { name: 'Puzzle Games', href: '/category/puzzle' },
    { name: 'Action Games', href: '/category/action' },
    { name: 'Strategy Games', href: '/category/strategy' },
    { name: 'Word Games', href: '/category/word' },
    { name: 'Arcade Games', href: '/category/arcade' },
  ]

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Gamepad2 className="h-8 w-8 text-primary-500" />
                <span className="text-2xl font-bold text-gradient">Love Game Click</span>
              </Link>
            </div>

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
