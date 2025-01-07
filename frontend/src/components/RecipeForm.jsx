import { useState, useEffect } from 'react';
import api from "../api";

function RecipeForm({ initialRecipe = null, onSuccess, isRecipeUpdate = false }) {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    time_minutes: "",
    price: "",
    link: "",
  });

  useEffect(() => {
    if (initialRecipe) {
      setRecipe(initialRecipe);
    }
  }, [initialRecipe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRecipeUpdate) {
        await api.put(`/recipes/${recipe.id}/`, recipe);
      } else {
        await api.post("/recipes/", recipe);
      }
      onSuccess();
      if (!isRecipeUpdate) {
        setRecipe({
          title: "",
          description: "",
          time_minutes: "",
          price: "",
          link: "",
        });
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>{isRecipeUpdate ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      <input
        className="form-input"
        type="text"
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Recipe Title"
        required
      />
      <textarea
        className="form-input"
        name="description"
        value={recipe.description}
        onChange={handleChange}
        placeholder="Recipe Description (optional)"
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
        placeholder="Recipe Link (optional)"
      />
      <button type="submit">
        {isRecipeUpdate ? 'Save Changes' : 'Add Recipe'}
      </button>
      {isRecipeUpdate && (
        <button type="button" onClick={() => onSuccess()}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default RecipeForm;