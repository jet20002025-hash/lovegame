import fs from 'fs'
import path from 'path'

export interface Game {
  id: string
  title: string
  slug: string
  category: string
  iframeUrl: string
  description: string
  howToPlay: string
  features: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
  thumbnail: string
  tags: string[]
  publishedAt: string
  featured?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
}

export interface GamesData {
  games: Game[]
  categories: Category[]
}

const dataFilePath = path.join(process.cwd(), 'data', 'games.json')

export async function getGamesData(): Promise<GamesData> {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading games data:', error)
    return { games: [], categories: [] }
  }
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const { games } = await getGamesData()
  return games.find(game => game.slug === slug) || null
}

export async function getGamesByCategory(category: string): Promise<Game[]> {
  const { games } = await getGamesData()
  return games.filter(game => game.category === category)
}

export async function getFeaturedGames(): Promise<Game[]> {
  const { games } = await getGamesData()
  return games.filter(game => game.featured)
}

export async function getRecentGames(limit: number = 6): Promise<Game[]> {
  const { games } = await getGamesData()
  return games
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export async function searchGames(query: string): Promise<Game[]> {
  const { games } = await getGamesData()
  const lowercaseQuery = query.toLowerCase()
  
  return games.filter(game => 
    game.title.toLowerCase().includes(lowercaseQuery) ||
    game.description.toLowerCase().includes(lowercaseQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export async function addGame(gameData: Omit<Game, 'id' | 'slug' | 'publishedAt'>): Promise<Game> {
  const { games, categories } = await getGamesData()
  
  // Generate slug from title
  const slug = gameData.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
  
  // Check if slug already exists
  let finalSlug = slug
  let counter = 1
  while (games.some(game => game.slug === finalSlug)) {
    finalSlug = `${slug}-${counter}`
    counter++
  }
  
  const newGame: Game = {
    ...gameData,
    id: finalSlug,
    slug: finalSlug,
    publishedAt: new Date().toISOString()
  }
  
  // Add to games array
  games.push(newGame)
  
  // Write back to file
  const updatedData = { games, categories }
  fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2))
  
  return newGame
}

export async function updateGame(slug: string, updates: Partial<Game>): Promise<Game | null> {
  const { games, categories } = await getGamesData()
  const gameIndex = games.findIndex(game => game.slug === slug)
  
  if (gameIndex === -1) {
    return null
  }
  
  // Update the game
  games[gameIndex] = { ...games[gameIndex], ...updates }
  
  // Write back to file
  const updatedData = { games, categories }
  fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2))
  
  return games[gameIndex]
}

export async function deleteGame(slug: string): Promise<boolean> {
  const { games, categories } = await getGamesData()
  const gameIndex = games.findIndex(game => game.slug === slug)
  
  if (gameIndex === -1) {
    return false
  }
  
  // Remove the game
  games.splice(gameIndex, 1)
  
  // Write back to file
  const updatedData = { games, categories }
  fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2))
  
  return true
}
