import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  CardMedia,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";

function RecipeDetailsPage() {
  const { id } = useParams(); // Extracting recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

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
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box
      sx={{ backgroundColor: "#e7f1fe", minHeight: "100vh", paddingBottom: 4 }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#C4DCFC" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              marginRight: 2,
            }}
            onClick={() => navigate("/")}
          >
            <img
              src={`http://localhost:5000/uploads/logonono.png`}
              alt="Nono Logo"
              style={{ height: "75px", objectFit: "contain" }}
            />
          </Box>

          {/* Categories */}
          <Box
            sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}
          >
            {[
              "Starter",
              "Pasta",
              "Meat",
              "Breakfast",
              "Pastries",
              "Desserts",
            ].map((category) => (
              <Typography
                key={category}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#2C3E50",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() =>
                  console.log(`Filtering by category: ${category}`)
                }
              >
                {category}
              </Typography>
            ))}
          </Box>

          {/* Add Recipe Icon */}
          <IconButton
            sx={{ color: "#2C3E50" }}
            onClick={() => navigate("/add-recipe")}
          >
            <AddCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Recipe Details */}
      <Container sx={{ marginTop: 4 }}>
        <Paper
          sx={{
            padding: 3,
            borderRadius: 4,
            display: "flex",
            flexDirection: "row", // הצבת תוכן בשורה
            alignItems: "flex-start", // יישור למעלה
            gap: 3, // רווח בין התמונה לטקסט
          }}
        >
          {/* התמונה בצד שמאל */}
          <Box
            sx={{
              width: "300px",
              height: "300px",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={`http://localhost:5000/${recipe.image}`}
              alt={recipe.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // התמונה מותאמת לגודל הקופסה
              }}
            />
          </Box>

          {/* הטקסט בצד ימין */}
          <Box sx={{ flex: 1, direction: "rtl" }}>
            <Typography
              variant="h4"
              sx={{
                marginBottom: 2,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {recipe.title}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              <strong>מצרכים:</strong>
              <ul>
                {recipe.ingredients.split("\n").map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "justify", marginTop: 2 }}
            >
              <strong>אופן ההכנה:</strong>
              {recipe.instructions.split("\n").map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "right", marginTop: 2 }}
            >
              קטגוריה: {recipe.category}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default RecipeDetailsPage;
