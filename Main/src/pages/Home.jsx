import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import RecipeCard from '../components/RecipeCard'

const API_KEY = ''

function Home() {
  const [query, setQuery] = useState('')
  const [diet, setDiet] = useState('')
  const [maxCalories, setMaxCalories] = useState('')

  const fetchRecipes = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: API_KEY,
          query,
          diet,
          maxCalories,
          number: 12,
        },
      }
    )
    return response.data.results
  }

  const { data: recipes, isLoading, refetch } = useQuery({
    queryKey: ['recipes', query, diet, maxCalories],
    queryFn: fetchRecipes,
    enabled: false, // Only fetch on button click
  })

  const handleSearch = (e) => {
    e.preventDefault()
    refetch()
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes (e.g., pasta)"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">All Diets</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten free">Gluten Free</option>
          </select>
          <input
            type="number"
            value={maxCalories}
            onChange={(e) => setMaxCalories(e.target.value)}
            placeholder="Max Calories"
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition-colors"
        >
          Search Recipes
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
