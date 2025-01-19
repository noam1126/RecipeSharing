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
import { Favorite, Logout, AddCircle } from "@mui/icons-material";

function RecipeDetailsPage() {
  const { id } = useParams(); // שליפת מזהה המתכון מהכתובת
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
    <Box sx={{ backgroundColor: "#F7F9FC", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#AEDFF7" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              color: "#2C3E50",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Nono
          </Typography>

          {/* Icons */}
          <Box>
            <IconButton
              sx={{ color: "#2C3E50" }}
              onClick={() => navigate("/favorites")}
            >
              <Favorite />
            </IconButton>
            <IconButton
              sx={{ color: "#2C3E50" }}
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              <Logout />
            </IconButton>
            <IconButton
              sx={{ color: "#2C3E50" }}
              onClick={() => navigate("/add-recipe")}
            >
              <AddCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Recipe Details */}
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
            <strong>מצרכים:</strong>
            <ul>
              {recipe.ingredients.split("\n").map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "justify", direction: "rtl" }}
          >
            <strong>אופן ההכנה:</strong>
            {recipe.instructions.split("\n").map((step, index) => (
              <p key={index}>{step}</p>
            ))}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default RecipeDetailsPage;
