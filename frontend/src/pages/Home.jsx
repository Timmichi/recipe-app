// src/pages/Home.jsx
import { useState, useEffect } from "react";
import api from "../api";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";

const INITIAL_STATE = {
  title: "",
  time_minutes: "",
  price: "",
  link: "",
  description: "",
  ingredients: [],
};

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onSuccess = async (recipe) => {
    try {
      await api.post("/recipes/", recipe);
      fetchRecipes();
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

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
      <RecipeForm
        initialRecipe={INITIAL_STATE}
        onSuccess={onSuccess}
        isCreateRecipe={true}
      />
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default Home;
