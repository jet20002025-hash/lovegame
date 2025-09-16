import { notFound } from 'next/navigation'
import { getGameBySlug, getGamesData } from '@/lib/games'
import { Play, Star, Clock, Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import FullscreenButton from '@/components/FullscreenButton'

interface GamePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const { games } = await getGamesData()
  return games.map((game) => ({
    slug: game.slug,
  }))
}

export async function generateMetadata({ params }: GamePageProps) {
  const game = await getGameBySlug(params.slug)
  
  if (!game) {
    return {
      title: 'Game Not Found',
    }
  }

  return {
    title: `${game.title} - Play Free Online | Love Game Click`,
    description: game.description,
    canonical: `https://lovegame.click/game/${game.slug}`,
    openGraph: {
      title: `${game.title} - Play Free Online`,
      description: game.description,
      url: `https://lovegame.click/game/${game.slug}`,
      images: [
        {
          url: game.thumbnail,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - Play Free Online`,
      description: game.description,
      images: [game.thumbnail],
    },
  }
}

export default async function GamePage({ params }: GamePageProps) {
  const game = await getGameBySlug(params.slug)
  
  if (!game) {
    notFound()
  }

  const { categories } = await getGamesData()
  const category = categories.find(cat => cat.id === game.category)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Game Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Games</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">4.8</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">1.2k plays</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Content */}
          <div className="lg:col-span-2">
            {/* Game Title and Category */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-sm font-medium text-primary-500 uppercase tracking-wide">
                  {category?.name}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(game.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{game.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{game.description}</p>
            </div>

            {/* Game iframe */}
            <div className="card mb-8">
              <div className="aspect-video bg-gray-100 rounded-t-xl relative">
                <iframe
                  src={game.iframeUrl}
                  className="game-iframe rounded-t-xl"
                  allowFullScreen
                  title={game.title}
                />
                <FullscreenButton 
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-70 transition-colors duration-200"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>5 min avg</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>1.2k plays</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Play */}
            <div className="card mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {game.howToPlay}
                  </p>
                </div>
              </div>
            </div>

            {/* Game Features */}
            <div className="card mb-8">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="card">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {game.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Game Info Card */}
            <div className="card mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Game Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{category?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published:</span>
                    <span className="font-medium">{new Date(game.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plays:</span>
                    <span className="font-medium">1.2k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="card mb-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Games */}
            <div className="card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">More Games</h3>
                <div className="space-y-4">
                  <Link 
                    href="/category/puzzle"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900">Puzzle Games</div>
                    <div className="text-sm text-gray-600">Brain-teasing challenges</div>
                  </Link>
                  <Link 
                    href="/category/action"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900">Action Games</div>
                    <div className="text-sm text-gray-600">Fast-paced adventures</div>
                  </Link>
                  <Link 
                    href="/category/strategy"
                    className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="font-medium text-gray-900">Strategy Games</div>
                    <div className="text-sm text-gray-600">Tactical thinking</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
