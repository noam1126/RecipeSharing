import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // בדוק אם התחברות הצליחה
      if (response.data.token) {
        // שמירת הטוקן ב-localStorage
        localStorage.setItem("authToken", response.data.token);
        alert("Login successful!");
        navigate("/home"); // מעבר לעמוד הראשי
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login.");
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
        <Typography variant="h5">Login</Typography>
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
        <Button
          onClick={handleLogin}
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
        >
          Login
        </Button>

        {/* כפתור למעבר לדף ההרשמה אם אין משתמש */}
        <Box sx={{ marginTop: "1rem" }}>
          <Typography variant="body2">
            Don't have an account?
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "#ff6f61" }}
            >
              {" "}
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
