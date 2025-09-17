import Link from 'next/link'
import { Play, Star, Clock, Users, Sparkles } from 'lucide-react'
import { getGamesData } from '@/lib/games'

export const metadata = {
  title: 'Love Game Click - Ultimate Gaming Hub',
  description: 'Play free online games at Love Game Click. Discover amazing puzzle, action, strategy, and word games. No downloads required - just click and play!',
  canonical: 'https://lovegame.click',
  openGraph: {
    title: 'Love Game Click - Ultimate Gaming Hub',
    description: 'Play free online games at Love Game Click. Discover amazing puzzle, action, strategy, and word games.',
    url: 'https://lovegame.click',
    images: [
      {
        url: '/images/og-homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Love Game Click - Ultimate Gaming Hub',
      },
    ],
  },
}

export default async function HomePage() {
  const { games, categories } = await getGamesData()
  const featuredGames = games.filter(game => game.featured)
  const recentGames = games.slice(0, 6)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Sparkles className="h-16 w-16 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Ultimate Gaming Hub
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover and play amazing free online games. No downloads, no registration - 
            just pure gaming fun at your fingertips!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              href="#featured-games" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Games
            </Link>
            <Link 
              href="/category/action" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg"
            >
              Start Playing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{games.length}+</div>
              <div className="text-gray-600 font-medium">Free Games</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{categories.length}</div>
              <div className="text-gray-600 font-medium">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section id="featured-games" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Games
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Handpicked games that deliver exceptional entertainment and challenge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <div key={game.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <Play className="h-16 w-16 text-gray-400" />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                      {categories.find(cat => cat.id === game.category)?.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 font-medium">4.8</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{game.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{game.description}</p>
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
                      className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
                    >
                      Play Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Game Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse collection of games across different genres
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`}
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Games Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest Additions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fresh games added regularly to keep your gaming experience exciting
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentGames.map((game, index) => (
              <div key={game.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <Play className="h-12 w-12 text-gray-400" />
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                      {categories.find(cat => cat.id === game.category)?.name}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{game.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{game.description}</p>
                  <Link 
                    href={`/game/${game.slug}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 font-semibold px-4 py-3 rounded-xl transition-all duration-200 text-center block"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Gaming?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of players enjoying free games every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/category/action" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse All Games
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              Submit Your Game
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}