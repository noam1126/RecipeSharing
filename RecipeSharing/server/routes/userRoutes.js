const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// לוגיקת הרשמה
router.post("/register", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // בדוק אם הסיסמאות תואמות
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // בדוק אם המייל כבר קיים
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // קביעת סוג המשתמש (מנהל אם המייל הוא noam1126@gmail.com)
    const isAdmin = email === "noam1126@gmail.com";

    // יצירת משתמש חדש
    const newUser = new User({
      email,
      password: hashedPassword,
      role: isAdmin ? "admin" : "user", // מגדיר את תפקיד המשתמש
    });

    // שמירת המשתמש ב-DB
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// לוגיקת התחברות
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // בדיקה אם חסרים שדות
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // בדיקת משתמש במסד הנתונים
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // השוואת סיסמאות
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // יצירת טוקן JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

module.exports = router;
