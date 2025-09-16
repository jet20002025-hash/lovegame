import Link from 'next/link'
import { getGamesData } from '@/lib/games'

export const metadata = {
  title: 'Contact Us - Love Game Click',
  description: 'Get in touch with Love Game Click. Have questions, suggestions, or want to submit a game? We\'d love to hear from you!',
  canonical: 'https://lovegame.click/contact',
}

export default async function ContactPage() {
  const { games } = await getGamesData()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We&apos;d love to hear from you! Get in touch with questions, suggestions, or feedback.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="input-field">
                  <option>General Inquiry</option>
                  <option>Game Submission</option>
                  <option>Technical Support</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="input-field"
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We&apos;re here to help! Whether you have a question about our games, 
                want to suggest a new game, or need technical support, we&apos;re just 
                a message away.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📧</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-700">hello@lovegame.click</p>
                  <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🎮</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Game Submissions</h3>
                  <p className="text-gray-700">games@lovegame.click</p>
                  <p className="text-sm text-gray-500">Submit your game for review</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-success-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">💬</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                  <p className="text-gray-700">Join our Discord server</p>
                  <p className="text-sm text-gray-500">Connect with other gamers</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-warning-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🐛</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bug Reports</h3>
                  <p className="text-gray-700">bugs@lovegame.click</p>
                  <p className="text-sm text-gray-500">Report issues you encounter</p>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">How do I submit a game?</h4>
                  <p className="text-sm text-gray-700">
                    Send us an email with your game details and iframe URL. We&apos;ll review it and get back to you!
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Are all games really free?</h4>
                  <p className="text-sm text-gray-700">
                    Yes! Every game on our platform is completely free to play with no hidden costs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Can I play on mobile?</h4>
                  <p className="text-sm text-gray-700">
                    Absolutely! All our games are optimized for mobile devices and work great on phones and tablets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-500 mb-2">{games.length}+</div>
              <div className="text-gray-600">Games Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary-500 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success-500 mb-2">&lt;24h</div>
              <div className="text-gray-600">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-warning-500 mb-2">100%</div>
              <div className="text-gray-600">Free Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
