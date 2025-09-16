'use client'

import { useState } from 'react'
import { X, Plus, Minus, Gamepad2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface AddGameModalProps {
  isOpen: boolean
  onClose: () => void
}

interface GameData {
  title: string
  category: string
  iframeUrl: string
  description: string
  howToPlay: string
  features: string[]
  faqs: Array<{ question: string; answer: string }>
}

const categories = [
  { id: 'puzzle', name: 'Puzzle Games' },
  { id: 'action', name: 'Action Games' },
  { id: 'strategy', name: 'Strategy Games' },
  { id: 'word', name: 'Word Games' },
  { id: 'arcade', name: 'Arcade Games' },
]

export default function AddGameModal({ isOpen, onClose }: AddGameModalProps) {
  const [gameData, setGameData] = useState<GameData>({
    title: '',
    category: 'puzzle',
    iframeUrl: '',
    description: '',
    howToPlay: '',
    features: [''],
    faqs: [{ question: '', answer: '' }]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!gameData.title.trim()) {
      newErrors.title = 'Game title is required'
    }

    if (!gameData.iframeUrl.trim()) {
      newErrors.iframeUrl = 'Game URL is required'
    } else if (!isValidUrl(gameData.iframeUrl)) {
      newErrors.iframeUrl = 'Please enter a valid URL'
    }

    if (!gameData.description.trim()) {
      newErrors.description = 'Game description is required'
    }

    if (!gameData.howToPlay.trim()) {
      newErrors.howToPlay = 'How to play instructions are required'
    }

    const validFeatures = gameData.features.filter(f => f.trim())
    if (validFeatures.length === 0) {
      newErrors.features = 'At least one feature is required'
    }

    const validFaqs = gameData.faqs.filter(faq => faq.question.trim() && faq.answer.trim())
    if (validFaqs.length === 0) {
      newErrors.faqs = 'At least one FAQ is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors below')
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare the game data
      const newGame = {
        title: gameData.title.trim(),
        category: gameData.category,
        iframeUrl: gameData.iframeUrl.trim(),
        description: gameData.description.trim(),
        howToPlay: gameData.howToPlay.trim(),
        features: gameData.features.filter(f => f.trim()),
        faqs: gameData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
        thumbnail: `/images/${gameData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
        tags: [gameData.category, 'new'],
        featured: false
      }

      // In a real app, this would make an API call
      // For now, we'll just show a success message
      console.log('New game data:', newGame)
      
      toast.success('Game added successfully!')
      
      // Reset form
      setGameData({
        title: '',
        category: 'puzzle',
        iframeUrl: '',
        description: '',
        howToPlay: '',
        features: [''],
        faqs: [{ question: '', answer: '' }]
      })
      
      onClose()
      
    } catch (error) {
      toast.error('Failed to add game. Please try again.')
      console.error('Error adding game:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const addFeature = () => {
    setGameData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }))
  }

  const removeFeature = (index: number) => {
    if (gameData.features.length > 1) {
      setGameData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }))
    }
  }

  const updateFeature = (index: number, value: string) => {
    setGameData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => i === index ? value : feature)
    }))
  }

  const addFAQ = () => {
    setGameData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }))
  }

  const removeFAQ = (index: number) => {
    if (gameData.faqs.length > 1) {
      setGameData(prev => ({
        ...prev,
        faqs: prev.faqs.filter((_, i) => i !== index)
      }))
    }
  }

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setGameData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => i === index ? { ...faq, [field]: value } : faq)
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Gamepad2 className="h-6 w-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900">Add New Game</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Game Title *
                      </label>
                      <input
                        type="text"
                        value={gameData.title}
                        onChange={(e) => setGameData(prev => ({ ...prev, title: e.target.value }))}
                        className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder="Enter game title"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={gameData.category}
                        onChange={(e) => setGameData(prev => ({ ...prev, category: e.target.value }))}
                        className="input-field"
                      >
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Game iframe URL *
                      </label>
                      <input
                        type="url"
                        value={gameData.iframeUrl}
                        onChange={(e) => setGameData(prev => ({ ...prev, iframeUrl: e.target.value }))}
                        className={`input-field ${errors.iframeUrl ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder="https://example.com/game-embed"
                      />
                      {errors.iframeUrl && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.iframeUrl}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Game Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What is this game? *
                  </label>
                  <textarea
                    rows={4}
                    value={gameData.description}
                    onChange={(e) => setGameData(prev => ({ ...prev, description: e.target.value }))}
                    className={`input-field ${errors.description ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Describe what this game is about..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* How to Play */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How to Play *
                  </label>
                  <textarea
                    rows={4}
                    value={gameData.howToPlay}
                    onChange={(e) => setGameData(prev => ({ ...prev, howToPlay: e.target.value }))}
                    className={`input-field ${errors.howToPlay ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Explain how to play this game..."
                  />
                  {errors.howToPlay && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.howToPlay}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Game Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Features</h3>
                  <div className="space-y-3">
                    {gameData.features.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 input-field"
                          placeholder={`Feature ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                          disabled={gameData.features.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFeature}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Feature</span>
                    </button>
                    {errors.features && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.features}
                      </p>
                    )}
                  </div>
                </div>

                {/* FAQs */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {gameData.faqs.map((faq, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm font-medium text-gray-700">FAQ {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeFAQ(index)}
                            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                            disabled={gameData.faqs.length === 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="space-y-3">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                            className="input-field"
                            placeholder="Question"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                            className="input-field"
                            placeholder="Answer"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addFAQ}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add FAQ</span>
                    </button>
                    {errors.faqs && (
                      <p className="text-sm text-red-600 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.faqs}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-6 border-t border-gray-200 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding Game...' : 'Add Game'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
