import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useState } from 'react'

function RecipeCard({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(
    JSON.parse(localStorage.getItem('favorites') || '[]').includes(recipe.id)
  )

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFavorite) {
      const newFavorites = favorites.filter((id) => id !== recipe.id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
    } else {
      favorites.push(recipe.id)
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{recipe.title}</h3>
        <div className="flex justify-between items-center">
          <Link
            to={`/recipe/${recipe.id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            View Recipe
          </Link>
          <button
            onClick={toggleFavorite}
            className={`text-2xl ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard