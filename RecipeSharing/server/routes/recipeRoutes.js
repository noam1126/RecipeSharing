const express = require("express");
const Recipe = require("../models/Recipe");
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

// ב- Backend Route להוספת מתכון

router.post("/addRecipe", async (req, res) => {
  const { userId, title, ingredients, instructions } = req.body;

  const user = await User.findById(userId);

  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You do not have permission to add a recipe." });
  }

  // קוד להוספת המתכון לבסיס הנתונים...
});

module.exports = router;
