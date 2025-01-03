import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import RecipeForm from "../components/RecipeForm";
import NotFound from "./NotFound";

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const res = await api.get(`/recipes/${id}/`);
      setRecipe(res.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError(true);
    } finally {
      setIsLoading(false);
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <NotFound />;
  if (!recipe) return null;

  return (
    <div className="recipe-detail">
      {isEditing ? (
        <>
          <RecipeForm
            initialRecipe={recipe}
            onSuccess={onSuccess}
            isCreateRecipe={false}
          />
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
          <div className="button-group">
            <button onClick={() => setIsEditing(true)}>Edit Recipe</button>
            <button onClick={handleDelete}>Delete Recipe</button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeDetail;
