import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

// עיצוב מותאם אישית בעזרת styled-components
const CustomButton = styled(Button)({
  backgroundColor: "#ff6f61",
  color: "white",
  fontSize: "16px",
  borderRadius: "10px",
  textTransform: "none",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#ff4e3b",
  },
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
});

const CustomTextField = styled(TextField)({
  "& label": {
    fontWeight: "bold",
  },
  "& .MuiInputBase-root": {
    borderRadius: "8px",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#ff6f61",
    },
  },
});

function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      instructions,
      author: "userId", // לשים את ה-userId האמיתי של המשתמש
    };

    axios
      .post("/api/recipes", newRecipe)
      .then((response) => {
        console.log("Recipe added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ paddingTop: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
      >
        Add a New Recipe
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CustomTextField
          label="Ingredients (comma separated)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <CustomTextField
          label="Instructions"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <CustomButton variant="contained" fullWidth type="submit">
          Add Recipe
        </CustomButton>
      </form>
    </Container>
  );
}

export default AddRecipePage;
