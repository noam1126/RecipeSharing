// client/src/components/RegisterPage.js

import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // בלחיצה על כפתור ההרשמה
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          email,
          password,
          confirmPassword,
        }
      );

      if (response.status === 201) {
        alert("User registered successfully!");
        navigate("/login"); // כאן אנחנו משתמשים ב-navigate
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (error) {
      if (error.response) {
        // טיפול בהודעות שגיאה מהשרת
        alert(error.response.data.message || "Something went wrong!");
      } else {
        alert("Something went wrong!");
      }
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Register</Typography>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          onClick={handleRegister}
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
        >
          Register
        </Button>

        {/* כפתור למעבר לדף ההתחברות אם כבר יש למשתמש חשבון */}
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="body2">
            Already have an account?
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "#ff6f61" }}
            >
              {" "}
              Login here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
