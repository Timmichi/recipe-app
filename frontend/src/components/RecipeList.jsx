function RecipeList({ recipes, fetchRecipes }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipes/${id}/`);
      await fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="recipe-list">
      <h2>Your Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <p>Time: {recipe.time_minutes} minutes</p>
          <p>Price: ${recipe.price}</p>
          {recipe.link && (
            <a href={recipe.link} target="_blank">
              View Recipe
            </a>
          )}
          <button
            onClick={() => handleDelete(recipe.id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )


}