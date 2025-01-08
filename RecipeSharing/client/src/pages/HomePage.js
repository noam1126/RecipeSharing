import React, { useState, useEffect } from "react";
import { Container, Box, Tab, Tabs, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage({ user, onLogout }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    // לוגיקה להתנתקות (למחוק את ה-token לדוגמה)
    onLogout();
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        {/* טאבים עליונים */}
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="navigation tabs"
            centered
          >
            <Tab label="Home" />
            <Tab label="Favorites" />
            {user && user.isAdmin && <Tab label="Add Recipe" />}
            <Tab label="Logout" onClick={handleLogout} />
          </Tabs>
        </Box>

        {/* תוכן לכל טאב */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="h6">Welcome to Recipe Sharing</Typography>
            {/* הצגת המתכונים */}
            {/* כאן תוכל להוסיף את הקומפוננטה של המתכונים */}
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6">Favorites</Typography>
            {/* הצגת המתכונים המועדפים של המשתמש */}
            {/* כאן תוכל להוסיף את הקומפוננטה של המועדפים */}
          </Box>
        )}

        {tabValue === 2 && user && user.isAdmin && (
          <Box>
            <Typography variant="h6">Add a New Recipe</Typography>
            {/* כאן תוכל להוסיף את הקומפוננטה להוספת מתכון חדש */}
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default HomePage;
