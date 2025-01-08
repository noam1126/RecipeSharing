import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // לוגיקה להתחברות למערכת (עם API)
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
