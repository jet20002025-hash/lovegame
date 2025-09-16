import Link from 'next/link'
import { getGamesData } from '@/lib/games'

export const metadata = {
  title: 'About Us - Love Game Click',
  description: 'Learn about Love Game Click, the ultimate destination for free online games. Our mission is to provide the best gaming experience for players worldwide.',
  canonical: 'https://lovegame.click/about',
}

export default async function AboutPage() {
  const { games, categories } = await getGamesData()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Love Game Click</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Your ultimate destination for free online games. We're passionate about bringing 
            you the best gaming experience without any barriers.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              At Love Game Click, we believe that gaming should be accessible to everyone, 
              everywhere. Our mission is to provide a curated collection of high-quality 
              free online games that entertain, challenge, and bring joy to players of all ages.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We carefully select each game to ensure it meets our standards for quality, 
              fun, and accessibility. Whether you're looking for a quick puzzle to solve 
              during your coffee break or an immersive adventure to dive into, we've got 
              something for everyone.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-500 mb-2">{games.length}+</div>
              <div className="text-gray-600">Free Games</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary-500 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success-500 mb-2">24/7</div>
              <div className="text-gray-600">Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-warning-500 mb-2">100%</div>
              <div className="text-gray-600">Free</div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🎮 Diverse Game Collection</h3>
              <p className="text-gray-700">
                From brain-teasing puzzles to action-packed adventures, we offer games 
                across multiple categories to suit every taste and skill level.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🚀 Instant Play</h3>
              <p className="text-gray-700">
                No downloads, no registration required. Just click and play! All our 
                games are optimized to run smoothly in your browser.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">📱 Mobile Friendly</h3>
              <p className="text-gray-700">
                Play on any device - desktop, tablet, or mobile. Our responsive design 
                ensures the best gaming experience across all platforms.
              </p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🆓 Completely Free</h3>
              <p className="text-gray-700">
                Every game on our platform is completely free to play. No hidden costs, 
                no premium features locked behind paywalls.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
                <p className="text-gray-700">
                  We carefully curate our game collection to ensure every game meets 
                  our high standards for gameplay, graphics, and user experience.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
                <p className="text-gray-700">
                  Gaming should be accessible to everyone. We ensure our platform 
                  works across all devices and browsers without barriers.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Focus</h3>
                <p className="text-gray-700">
                  We're building a community of gamers who share our passion for 
                  quality games and positive gaming experiences.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-warning-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-700">
                  We continuously improve our platform and add new features to 
                  enhance your gaming experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions, suggestions, or want to submit a game? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="btn-primary"
            >
              Contact Us
            </Link>
            <Link 
              href="/" 
              className="btn-secondary"
            >
              Start Playing
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
