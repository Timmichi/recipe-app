import { useState } from "react";
import IngredientForm from "./IngredientForm";

function RecipeForm({ initialRecipe, onSuccess, isRecipeUpdate }) {
  const [recipe, setRecipe] = useState(initialRecipe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(recipe);
    onSuccess(recipe);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add New Recipe</h2>
      <input
        className="form-input"
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Recipe Title"
        required
      />
      <input
        className="form-input"
        type="number"
        name="time_minutes"
        value={recipe.time_minutes}
        onChange={handleChange}
        placeholder="Cooking Time (minutes)"
        required
      />
      <input
        className="form-input"
        type="number"
        name="price"
        value={recipe.price}
        onChange={handleChange}
        placeholder="Price"
        step="0.01"
        required
      />
      <input
        className="form-input"
        type="url"
        name="link"
        value={recipe.link}
        onChange={handleChange}
        placeholder="Recipe Link"
      />
      <div>
        <textarea style={{ width: "580px", height: "100px" }}
          className="form-input"
          name="description"
          value={recipe.description}
          onChange={handleChange}
          placeholder="Recipe Description"
        />
      </div>
      <IngredientForm
        ingredients={recipe.ingredients}
        setIngredients={(ingredients) => setRecipe(prev => ({ ...prev, ingredients }))}
      />
      {isRecipeUpdate ? (<button type="submit">Save Changes</button>) : (<button type="submit">Create Recipe</button>)}
    </form>
  );
}

export default RecipeForm;