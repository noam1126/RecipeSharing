import React, { useEffect, useState } from "react";
import axios from "axios";

function RecipePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // שליחה לבקשה לקבלת כל המתכונים
    axios
      .get("/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>All Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h2>{recipe.title}</h2>
            <p>{recipe.ingredients.join(", ")}</p>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipePage;
