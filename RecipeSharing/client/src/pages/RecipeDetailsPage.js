import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Box, Typography, CardMedia, Paper } from "@mui/material";

function RecipeDetailsPage() {
  const { id } = useParams(); // שליפת מזהה המתכון מהכתובת
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipes/${id}`
        );

        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details", error);
      }
      console.log("Recipe ID:", id);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 3, borderRadius: 4 }}>
        <Typography
          variant="h4"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {recipe.title}
        </Typography>
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:5000/${recipe.image}`}
          alt={recipe.title}
          sx={{ borderRadius: 4, marginBottom: 3 }}
        />
        <Typography
          variant="body1"
          sx={{ textAlign: "justify", direction: "rtl" }}
        >
          <strong>מצרכים:</strong> {recipe.ingredients}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "justify", direction: "rtl" }}
        >
          <strong>אופן ההכנה:</strong> {recipe.instructions}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "right", marginTop: 2, direction: "rtl" }}
        >
          קטגוריה: {recipe.category}
        </Typography>
      </Paper>
    </Container>
  );
}

export default RecipeDetailsPage;
