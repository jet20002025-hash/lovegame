'use client'

import { useState } from 'react'
import { Play, Star } from 'lucide-react'
import Link from 'next/link'

interface GameCardProps {
  game: {
    id: string
    title: string
    slug: string
    category: string
    thumbnail: string
    description: string
  }
  categoryName?: string
  showNewBadge?: boolean
  size?: 'large' | 'small'
}

export default function GameCard({ game, categoryName, showNewBadge = false, size = 'large' }: GameCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const isLarge = size === 'large'

  return (
    <div className={`bg-white ${isLarge ? 'rounded-3xl shadow-lg hover:shadow-2xl' : 'rounded-2xl shadow-lg hover:shadow-xl'} transition-all duration-300 transform hover:-translate-y-${isLarge ? '2' : '1'} overflow-hidden`}>
      <div className="aspect-video relative overflow-hidden">
        {!imageError ? (
          <img 
            src={game.thumbnail} 
            alt={game.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Play className={`${isLarge ? 'h-16 w-16' : 'h-12 w-12'} text-gray-400`} />
          </div>
        )}
        
        {isLarge && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
          </div>
        )}
        
        {showNewBadge && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </div>
        )}
      </div>
      
      <div className={isLarge ? 'p-8' : 'p-6'}>
        <div className={`flex items-center justify-between ${isLarge ? 'mb-4' : 'mb-3'}`}>
          <span className={`${isLarge ? 'text-sm' : 'text-xs'} font-semibold ${isLarge ? 'text-blue-600' : 'text-purple-600'} uppercase tracking-wide`}>
            {categoryName || game.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className={`${isLarge ? 'text-sm' : 'text-sm'} text-gray-600`}>4.8</span>
          </div>
        </div>
        
        <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 ${isLarge ? 'mb-4' : 'mb-3'}`}>
          {game.title}
        </h3>
        
        <p className={`text-gray-600 ${isLarge ? 'mb-6 line-clamp-3' : 'mb-4 line-clamp-2 text-sm'}`}>
          {game.description}
        </p>
        
        {isLarge ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span>5 min</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>1.2k</span>
              </div>
            </div>
            <Link 
              href={`/game/${game.slug}`}
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
            >
              Play Now
            </Link>
          </div>
        ) : (
          <Link 
            href={`/game/${game.slug}`}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold px-4 py-3 rounded-xl transition-all duration-200 text-center block"
          >
            Play Now
          </Link>
        )}
      </div>
    </div>
  )
}
