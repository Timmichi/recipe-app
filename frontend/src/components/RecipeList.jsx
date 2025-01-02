import RecipeCard from "./RecipeCard";

function RecipeList({ recipes }) {
  console.log(recipes);
  return (
    <div className="recipe-list">
      <h2>Your Recipes</h2>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeList;