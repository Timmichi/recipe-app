import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Form.css";

function Home() {
  const [recipes, setRecipes] = useState([]);

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

  return (
    <div className="container">
      <div className="header">
        <h1>Recipe Manager</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <RecipeForm fetchRecipes={fetchRecipes} />
      <RecipeList recipes={recipes} fetchRecipes={fetchRecipes} />
    </div>
  );
}

export default Home;
