'use client'

import { useState } from 'react'
import { ExternalLink, Play } from 'lucide-react'

interface GameDisplayProps {
  gameUrl: string
  title: string
  className?: string
}

export default function GameDisplay({ gameUrl, title, className }: GameDisplayProps) {
  const [showIframe, setShowIframe] = useState(false)

  // Check if the URL is from Y8.com or similar sites that don't allow iframe embedding
  const isY8Game = gameUrl.includes('y8.com')
  const isEmbeddable = !isY8Game

  if (isEmbeddable) {
    return (
      <div className={`aspect-video bg-gray-100 rounded-t-xl relative ${className}`}>
        <iframe
          src={gameUrl}
          className="game-iframe rounded-t-xl"
          allowFullScreen
          title={title}
        />
      </div>
    )
  }

  // For non-embeddable games (like Y8.com), show a play button that opens in new tab
  return (
    <div className={`aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl relative flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="mb-6">
          <Play className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">Click the button below to play this game</p>
        </div>
        <a
          href={gameUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          <Play className="h-5 w-5" />
          <span>Play Game</span>
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="text-sm text-gray-500 mt-4">
          Game will open in a new tab
        </p>
      </div>
    </div>
  )
}
