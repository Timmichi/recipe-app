import { useState } from "react";

function RecipeForm({ initialRecipe, onSuccess, isCreateRecipe }) {
  const [recipe, setRecipe] = useState(initialRecipe);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSuccess(recipe);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
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
        min="1"
        step="1"
      />
      <input
        className="form-input"
        type="number"
        name="price"
        value={recipe.price}
        onChange={handleChange}
        placeholder="Price"
        min="0"
        max="9999.99"
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
        <textarea
          style={{ width: "580px", height: "100px" }}
          className="form-input"
          name="description"
          value={recipe.description}
          onChange={handleChange}
          placeholder="Recipe Description"
        />
      </div>
      {isCreateRecipe ? (
        <button type="submit">Create Recipe</button>
      ) : (
        <button type="submit">Save Changes</button>
      )}
    </form>
  );
}

export default RecipeForm;
