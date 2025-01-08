import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    // לוגיקה להרשמה למערכת (עם API)
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
