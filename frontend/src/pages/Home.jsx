// src/pages/Home.jsx
import { useState, useEffect } from "react";
import api from "../api";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";

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
      <RecipeForm onSuccess={fetchRecipes} />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Home;
