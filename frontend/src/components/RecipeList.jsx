import { useState } from 'react';
import api from "../api";
import RecipeForm from "./RecipeForm";

function RecipeList({ recipes, fetchRecipes }) {
  const [editingRecipe, setEditingRecipe] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipes/${id}/`);
      await fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleUpdateSuccess = async () => {
    setEditingRecipe(null);
    await fetchRecipes();
  };

  return (
    <div className="recipe-list">
      <h2>Your Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          {editingRecipe?.id === recipe.id ? (
            <RecipeForm
              initialRecipe={recipe}
              onSuccess={handleUpdateSuccess}
              isRecipeUpdate={true}
            />
          ) : (
            <>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <p>Time: {recipe.time_minutes} minutes</p>
              <p>Price: ${recipe.price}</p>
              {recipe.link && (
                <a href={recipe.link} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              )}
              <div className="button-group">
                <button onClick={() => handleEdit(recipe)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default RecipeList;