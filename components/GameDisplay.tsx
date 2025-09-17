'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Play, AlertTriangle } from 'lucide-react'

interface GameDisplayProps {
  gameUrl: string
  title: string
  className?: string
}

export default function GameDisplay({ gameUrl, title, className }: GameDisplayProps) {
  const [showIframe, setShowIframe] = useState(true)
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if the URL is from sites that might have iframe restrictions
  const isY8Game = gameUrl.includes('y8.com')
  const isCoolMathGame = gameUrl.includes('coolmathgames.com')

  // Debug logging
  console.log('GameDisplay:', { gameUrl, isY8Game, isCoolMathGame, showIframe, iframeError })

  // Handle iframe load error
  const handleIframeError = () => {
    console.log('Iframe failed to load, showing fallback')
    setIframeError(true)
    setShowIframe(false)
    setIsLoading(false)
  }

  // Handle iframe load success
  const handleIframeLoad = () => {
    console.log('Iframe loaded successfully')
    setIsLoading(false)
  }

  // Handle iframe security error (X-Frame-Options)
  const handleIframeSecurityError = () => {
    console.log('Iframe security error (X-Frame-Options), showing fallback')
    setIframeError(true)
    setShowIframe(false)
    setIsLoading(false)
  }

  // Add effect to handle X-Frame-Options errors
  useEffect(() => {
    if (showIframe && !iframeError) {
      const timer = setTimeout(() => {
        // If iframe hasn't loaded after 3 seconds, assume it's blocked
        if (isLoading) {
          console.log('Iframe timeout, assuming X-Frame-Options block')
          handleIframeSecurityError()
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showIframe, iframeError, isLoading, isY8Game, isCoolMathGame])

  // Try to load iframe first, show fallback if it fails
  if (showIframe && !iframeError) {
    return (
      <div className={`aspect-video bg-gray-100 rounded-t-xl relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-t-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading game...</p>
            </div>
          </div>
        )}
        <iframe
          src={gameUrl}
          className="game-iframe rounded-t-xl"
          allowFullScreen
          title={title}
          onError={handleIframeError}
          onLoad={handleIframeLoad}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    )
  }

  // Fallback: Show play button with better UX
  return (
    <div className={`aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-xl relative flex items-center justify-center ${className}`}>
      <div className="text-center p-8">
        <div className="mb-6">
          <Play className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">Click the button below to play this game</p>
        </div>
        
        {/* Primary action - try to play in current tab first */}
        <div className="space-y-4">
          <button
            onClick={() => {
              // Try to open in current tab first
              window.location.href = gameUrl
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Play Game</span>
          </button>
          
          {/* Secondary action - open in new tab */}
          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Open in new tab</span>
          </a>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          Game will open in your browser
        </p>
      </div>
    </div>
  )
}
