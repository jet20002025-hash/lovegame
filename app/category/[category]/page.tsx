import Link from 'next/link'
import { getGamesByCategory, getGamesData } from '../../lib/games'
import { Play, Star, Clock, Users, ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const { categories } = await getGamesData()
  return categories.map((category) => ({
    category: category.id,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categories } = await getGamesData()
  const category = categories.find(cat => cat.id === params.category)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} - Free Online Games | Love Game Click`,
    description: `Play free ${category.name.toLowerCase()} at Love Game Click. ${category.description}`,
    canonical: `https://lovegame.click/category/${params.category}`,
    openGraph: {
      title: `${category.name} - Free Online Games`,
      description: `Play free ${category.name.toLowerCase()} at Love Game Click. ${category.description}`,
      url: `https://lovegame.click/category/${params.category}`,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categories } = await getGamesData()
  const category = categories.find(cat => cat.id === params.category)
  
  if (!category) {
    notFound()
  }

  const games = await getGamesByCategory(params.category)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              {games.length} games available
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {games.map((game, index) => (
              <div key={game.id} className="card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video bg-gray-200 rounded-t-xl flex items-center justify-center">
                  <Play className="h-16 w-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-500 uppercase tracking-wide">
                      {category.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{game.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>5 min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>1.2k</span>
                      </div>
                    </div>
                    <Link 
                      href={`/game/${game.slug}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Play Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎮</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Games Yet</h3>
            <p className="text-gray-600 mb-8">
              We're working on adding more {category.name.toLowerCase()} to this category.
            </p>
            <Link 
              href="/"
              className="btn-primary"
            >
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>

      {/* Other Categories */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Categories</h2>
            <p className="text-xl text-gray-600">
              Explore more game categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories
              .filter(cat => cat.id !== params.category)
              .map((cat) => (
                <Link 
                  key={cat.id} 
                  href={`/category/${cat.id}`}
                  className="group card p-6 text-center hover:scale-105 transition-transform duration-200"
                >
                  <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                    {cat.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-sm text-gray-600">{cat.description}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
