const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String], // רשימה של חומרים
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // מתייחס למשתמש שפרסם את המתכון
      required: true,
    },
  },
  {
    timestamps: true, // יוסיף זמן יצירה ועדכון אוטומטי
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
