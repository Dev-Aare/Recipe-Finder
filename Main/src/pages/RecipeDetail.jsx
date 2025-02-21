import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const API_KEY = '50095a2be67d475e88208a263754afb5'

function RecipeDetail() {
  const { id } = useParams()

  const fetchRecipeDetails = async () => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    )
    return response.data
  }

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: fetchRecipeDetails,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
        <div className="flex gap-4 mb-4">
          <span>Ready in: {recipe.readyInMinutes} min</span>
          <span>Servings: {recipe.servings}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 mb-4">
          {recipe.extendedIngredients?.map((ing) => (
            <li key={ing.id}>{ing.original}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />
      </div>
    </div>
  )
}

export default RecipeDetail