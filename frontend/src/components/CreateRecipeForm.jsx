// src/components/RecipeForm.jsx
import { useState } from "react";
import api from "../api";
import IngredientForm from "./IngredientForm";

const INITIAL_STATE = {
  title: "",
  description: "",
  time_minutes: "",
  price: "",
  link: "",
  ingredients: []
};

function CreateRecipeForm({ onSuccess }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/recipes/", formData);
      setFormData(INITIAL_STATE);
      onSuccess(); // Fetch recipes again
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add New Recipe</h2>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Recipe Title"
        required
      />
      <input
        type="number"
        name="time_minutes"
        value={formData.time_minutes}
        onChange={handleChange}
        placeholder="Cooking Time (minutes)"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        step="0.01"
        required
      />
      <input
        type="url"
        name="link"
        value={formData.link}
        onChange={handleChange}
        placeholder="Recipe Link"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Recipe Description"
      />
      <IngredientForm
        ingredients={formData.ingredients}
        setIngredients={(ingredients) => setFormData(prev => ({ ...prev, ingredients }))}
      />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default CreateRecipeForm;