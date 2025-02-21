import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'

const API_KEY = ''

function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]')
  )

  const fetchFavoriteRecipes = async () => {
    if (favoriteIds.length === 0) return []
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/informationBulk`,
      {
        params: {
          apiKey: API_KEY,
          ids: favoriteIds.join(','),
        },
      }
    )
    return response.data
  }

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['favorites', favoriteIds],
    queryFn: fetchFavoriteRecipes,
  })

  useEffect(() => {
    const handleStorageChange = () => {
      setFavoriteIds(JSON.parse(localStorage.getItem('favorites') || '[]'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Favorite Recipes</h1>
      {recipes?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No favorites yet!</p>
      )}
    </div>
  )
}

export default Favorites
