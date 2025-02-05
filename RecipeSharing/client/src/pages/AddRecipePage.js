import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  MenuItem,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const categories = [
    "Starter",
    "Pasta",
    "Meat",
    "Breakfast",
    "Pastries",
    "Desserts",
  ];

  const handleFilterChange = (event) => {
    console.log("Filtering by:", event.target.value);
  };

  const handleAddRecipe = async () => {
    if (!title || !ingredients || !instructions || !category) {
      alert("All fields except the image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("author", "noam@gmail.com");
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:5000/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Recipe added successfully!");
      setTitle("");
      setIngredients("");
      setInstructions("");
      setCategory("");
      setImage(null);
    } catch (error) {
      console.error("Error adding recipe", error);
      alert("Failed to add recipe");
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "#e7f1fe", minHeight: "100vh", paddingBottom: 4 }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#C4DCFC" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            onClick={() => navigate("/")}
          >
            <img
              src="http://localhost:5000/uploads/logonono.png"
              alt="Nono Logo"
              style={{ height: "75px", objectFit: "contain" }}
            />
          </Box>

          <Box
            sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}
          >
            {categories.map((cat) => (
              <Typography
                key={cat}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#2C3E50",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => handleFilterChange({ target: { value: cat } })}
              >
                {cat}
              </Typography>
            ))}
          </Box>

          <IconButton
            sx={{ color: "#2C3E50" }}
            onClick={() => navigate("/add-recipe")}
          >
            <AddCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container>
        <Box
          sx={{
            marginTop: 8,
            padding: 3,
            borderRadius: 4,
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          component={Paper}
        >
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Add a New Recipe
          </Typography>
          <TextField
            label="Title"
            fullWidth
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Ingredients"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <TextField
            label="Instructions"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <TextField
            select
            label="Category"
            fullWidth
            variant="outlined"
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: "1rem" }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          <Button
            onClick={handleAddRecipe}
            variant="contained"
            fullWidth
            sx={{ marginTop: "1.5rem" }}
          >
            Add Recipe
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AddRecipePage;
