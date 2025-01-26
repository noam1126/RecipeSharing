import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import axios from "axios";

function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [author, setAuthor] = useState(""); // שם המחבר
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const categories = [
    "Starter",
    "Pasta",
    "Meat",
    "Breakfast",
    "Pastries",
    "Desserts",
  ]; // קטגוריות קיימות

  const handleAddRecipe = async () => {
    if (!title || !ingredients || !instructions || !category) {
      alert("All fields except the image are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("author", "noam@gmail.com"); // היוצר מתמלא אוטומטית
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
          direction="rtl"
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
          direction="rtl"
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
          direction="rtl"
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
  );
}

export default AddRecipePage;
