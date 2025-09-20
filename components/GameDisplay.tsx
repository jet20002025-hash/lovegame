'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Play, AlertTriangle } from 'lucide-react'

interface GameDisplayProps {
  gameUrl: string
  title: string
  className?: string
}

export default function GameDisplay({ gameUrl, title, className }: GameDisplayProps) {
  // Check if the URL is from sites that might have iframe restrictions
  const isY8Game = gameUrl.includes('y8.com')
  const isCoolMathGame = gameUrl.includes('coolmathgames.com')
  const isScratchGame = gameUrl.includes('scratch.mit.edu')
  
  // Try to embed all games first, show fallback only if iframe fails
  // This allows us to test which games can actually be embedded
  const shouldShowFallback = false
  
  const [showIframe, setShowIframe] = useState(true)
  const [iframeError, setIframeError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Debug logging
  const getTimeoutDuration = () => {
    if (isScratchGame) return 10000
    if (isY8Game) return 3000
    if (isCoolMathGame) return 3000
    return 5000
  }
  
  console.log('GameDisplay:', { 
    gameUrl, 
    isY8Game, 
    isCoolMathGame, 
    isScratchGame, 
    showIframe, 
    iframeError, 
    shouldShowFallback,
    isLoading,
    timeoutDuration: getTimeoutDuration()
  })

  // Handle iframe load error
  const handleIframeError = () => {
    console.log('Iframe failed to load, showing fallback')
    setIframeError(true)
    setShowIframe(false)
    setIsLoading(false)
  }

  // Handle iframe load success
  const handleIframeLoad = () => {
    console.log('Iframe loaded successfully for:', gameUrl)
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
      // Set different timeout durations based on game type
      let timeoutDuration = 5000 // Default 5 seconds
      if (isScratchGame) {
        timeoutDuration = 10000 // Scratch games get 10 seconds
      } else if (isY8Game) {
        timeoutDuration = 3000 // Y8 games get 3 seconds (usually blocked)
      } else if (isCoolMathGame) {
        timeoutDuration = 3000 // CoolMathGames get 3 seconds (usually blocked)
      }
      
      const timer = setTimeout(() => {
        // If iframe hasn't loaded after timeout, assume it's blocked
        if (isLoading) {
          console.log(`Iframe timeout after ${timeoutDuration}ms for ${gameUrl}, assuming X-Frame-Options block`)
          handleIframeSecurityError()
        }
      }, timeoutDuration)

      return () => clearTimeout(timer)
    }
  }, [showIframe, iframeError, isLoading, isY8Game, isCoolMathGame, isScratchGame, gameUrl])

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
          sandbox={isScratchGame ? undefined : "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
        
        {/* Primary action - open in new tab */}
        <div className="space-y-4">
          <a
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Play className="h-5 w-5" />
            <span>Play Game (Opens in new tab)</span>
            <ExternalLink className="h-4 w-4" />
          </a>
          
          {/* Explanation for why it opens in new tab */}
          <p className="text-sm text-gray-500 mt-4 flex items-center justify-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>This game cannot be embedded due to external website restrictions.</span>
          </p>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          Game will open in your browser
        </p>
      </div>
    </div>
  )
}
