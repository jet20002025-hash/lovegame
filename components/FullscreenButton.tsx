'use client'

import { Maximize2 } from 'lucide-react'

interface FullscreenButtonProps {
  className?: string
}

export default function FullscreenButton({ className }: FullscreenButtonProps) {
  const handleFullscreen = () => {
    const iframe = document.querySelector('iframe') as HTMLIFrameElement
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen()
    }
  }

  return (
    <button 
      className={className}
      onClick={handleFullscreen}
    >
      <Maximize2 className="h-4 w-4" />
    </button>
  )
}
