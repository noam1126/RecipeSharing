const express = require("express");
const Recipe = require("../models/recipeModel");
const router = express.Router();

// יצירת מתכון חדש
router.post("/", async (req, res) => {
  const { title, ingredients, instructions, author } = req.body;

  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      author,
    });
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ message: "Error adding recipe", error: err });
  }
});

module.exports = router;
