import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { AUTH_TOKEN } from "../constants";
import "../styles/Form.css";

function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time_minutes: "",
    price: "",
    link: "",
  });

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await api.get("/recipes/");
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/recipes/", formData);
      await fetchRecipes();
      setFormData({
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recipes/${id}/`);
      await fetchRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Recipe Manager</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add New Recipe</h2>
        <input
          className="form-input"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
          required
        />
        <textarea
          className="form-input"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Recipe Description (optional)"
        />
        <input
          className="form-input"
          type="number"
          name="time_minutes"
          value={formData.time_minutes}
          onChange={handleChange}
          placeholder="Cooking Time (minutes)"
          required
        />
        <input
          className="form-input"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          className="form-input"
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Recipe Link (optional)"
        />
        <button type="submit">Add Recipe</button>
      </form>

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
    </div>
  );
}

export default Home;
