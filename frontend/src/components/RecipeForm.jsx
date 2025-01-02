// src/components/RecipeForm.jsx
import { useState } from "react";
import api from "../api";
import IngredientForm from "./IngredientForm";

function RecipeForm({ recipe, onSuccess }) {
  const [recipe, setRecipe] = useState(recipe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recipes/", recipe);
      setRecipe(INITIAL_STATE);
      onSuccess(); // Fetch recipes again
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add New Recipe</h2>
      <input
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Recipe Title"
        required
      />
      <input
        type="number"
        name="time_minutes"
        value={recipe.time_minutes}
        onChange={handleChange}
        placeholder="Cooking Time (minutes)"
        required
      />
      <input
        type="number"
        name="price"
        value={recipe.price}
        onChange={handleChange}
        placeholder="Price"
        step="0.01"
        required
      />
      <input
        type="url"
        name="link"
        value={recipe.link}
        onChange={handleChange}
        placeholder="Recipe Link"
      />
      <textarea
        name="description"
        value={recipe.description}
        onChange={handleChange}
        placeholder="Recipe Description"
      />
      <IngredientForm
        ingredients={recipe.ingredients}
        setIngredients={(ingredients) => setRecipe(prev => ({ ...prev, ingredients }))}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;