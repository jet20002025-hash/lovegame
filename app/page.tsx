import Link from 'next/link'
import { Play, Star, Clock, Users } from 'lucide-react'
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Ultimate Gaming Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover and play amazing free online games. No downloads, no registration - 
            just pure gaming fun at your fingertips!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#featured-games" 
              className="bg-white text-primary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Explore Games
            </Link>
            <Link 
              href="/category/puzzle" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-500 font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Start Playing
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up">
              <div className="text-4xl font-bold text-primary-500 mb-2">{games.length}+</div>
              <div className="text-gray-600">Free Games</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-secondary-500 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-success-500 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-warning-500 mb-2">100%</div>
              <div className="text-gray-600">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section id="featured-games" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Games</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hand-picked games that are trending and loved by our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <div key={game.id} className="card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video bg-gray-200 rounded-t-xl flex items-center justify-center">
                  <Play className="h-16 w-16 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-500 uppercase tracking-wide">
                      {categories.find(cat => cat.id === game.category)?.name}
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
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Game Categories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore games by category and find your perfect match
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                href={`/category/${category.id}`}
                className="group card p-6 text-center hover:scale-105 transition-transform duration-200"
              >
                <div className="text-4xl mb-4 group-hover:animate-bounce-gentle">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Games */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Games</h2>
              <p className="text-xl text-gray-600">
                Fresh games added to our collection
              </p>
            </div>
            <Link 
              href="/games" 
              className="btn-primary"
            >
              View All Games
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentGames.map((game, index) => (
              <div key={game.id} className="card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video bg-gray-200 rounded-t-xl flex items-center justify-center">
                  <Play className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-500 uppercase tracking-wide">
                      {categories.find(cat => cat.id === game.category)?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(game.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{game.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>
                  <Link 
                    href={`/game/${game.slug}`}
                    className="btn-primary w-full text-center"
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
      <section className="py-16 bg-gradient-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Gaming?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of players enjoying our free games collection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/category/puzzle" 
              className="bg-white text-secondary-500 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Start Playing Now
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-white text-white hover:bg-white hover:text-secondary-500 font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
