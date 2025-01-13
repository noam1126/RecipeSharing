const express = require("express");
const multer = require("multer");
const Recipe = require("../models/Recipe");
const User = require("../models/User"); // ודא שהמודל קיים
const router = express.Router();

// הגדרת multer להעלאת תמונות
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // תיקייה לשמירת תמונות
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // שם ייחודי לכל קובץ
  },
});
const upload = multer({ storage });

// יצירת מתכון חדש עם תמונה
router.post("/", upload.single("image"), async (req, res) => {
  const { title, ingredients, instructions, category, author } = req.body;
  const imagePath = req.file ? req.file.path : null;

  try {
    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      category,
      image: imagePath,
      author,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error("Error adding recipe:", err);
    res.status(400).json({ message: "Error adding recipe", error: err });
  }
});

// קבלת כל המתכונים
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find(); // משיכת כל המתכונים מהמסד נתונים
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
});

module.exports = router;
