import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import RecipeForm from "../components/RecipeForm";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/recipes/${id}/`);
      setRecipe(res.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const onSuccess = async (recipe) => {
    try {
      await api.put(`/recipes/${id}/`, recipe);
      setIsEditing(false);
      fetchRecipe();
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/recipes/${id}/`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-detail">
      {isEditing ? (
        <>
          <RecipeForm initialRecipe={recipe} onSuccess={onSuccess} isRecipeUpdate={true} />
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{recipe.title}</h2>
          <div className="recipe-info">
            <p>{recipe.description}</p>
            <p>Time: {recipe.time_minutes} minutes</p>
            <p>Price: ${recipe.price}</p>
            {recipe.link && (
              <a href={recipe.link} target="_blank" rel="noopener noreferrer">
                View Recipe Link
              </a>
            )}
          </div>
          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {recipe.ingredients.map(ingredient => (
                <li key={ingredient.id}>
                  {ingredient.name}
                  {ingredient.quantity && ` - ${ingredient.quantity}`}
                  {ingredient.measurement && ` ${ingredient.measurement}`}
                  {ingredient.price && ` ($${ingredient.price})`}
                </li>
              ))}
            </ul>
          </div>
          <div className="button-group">
            <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
            <button onClick={handleDelete} className="delete-button">
              Delete Recipe
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeDetail;