import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import axios from "axios";

function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleAddRecipe = async () => {
    try {
      await axios.post(
        "http://localhost:5000/recipes",
        { title, description, category },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Recipe added successfully!");
    } catch (error) {
      console.error("Error adding recipe", error);
      alert("Failed to add recipe");
    }
  };

  return (
    <Container>
      <Box sx={{ marginTop: 8 }}>
        <Typography variant="h5">Add a New Recipe</Typography>
        <TextField
          label="Title"
          fullWidth
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Category"
          fullWidth
          variant="outlined"
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Button
          onClick={handleAddRecipe}
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
        >
          Add Recipe
        </Button>
      </Box>
    </Container>
  );
}

export default AddRecipePage;
