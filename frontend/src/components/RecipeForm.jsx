import { useState } from 'react';

function RecipeForm({ fetchRecipes }) {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    time_minutes: "",
    price: "",
    link: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/recipes/", recipe);
      await fetchRecipes();
      setRecipe({
        title: "",
        description: "",
        time_minutes: "",
        price: "",
        link: "",
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
}

return (
  <form onSubmit={handleSubmit} className="form-container">
    <h2>Add New Recipe</h2>
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
    <button type="submit">Add Recipe</button>
  </form>
)