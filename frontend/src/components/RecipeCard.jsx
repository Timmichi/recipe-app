import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>
        <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
      </h3>
      <div className="recipe-details">
        <span>Time: {recipe.time_minutes} minutes |&nbsp;</span>
        <span>Price: ${recipe.price}</span>
      </div>
    </div>
  );
}

export default RecipeCard;
