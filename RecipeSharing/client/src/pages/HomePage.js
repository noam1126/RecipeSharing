import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Tab,
  Tabs,
  Typography,
  Button,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Favorite, Logout, AddCircle } from "@mui/icons-material"; // אייקונים
import axios from "axios"; // אם תשתמש ב-axios לשליפת המתכונים

function HomePage({ user, onLogout }) {
  const [tabValue, setTabValue] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRecipes(response.data);
        setFilteredRecipes(response.data); // הצגת כל המתכונים בהתחלה
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // מחיקת ה-token
    onLogout();
    navigate("/login"); // הפניית המשתמש לדף ההתחברות
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    filterRecipes(event.target.value, filter);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    filterRecipes(searchQuery, event.target.value);
  };

  const filterRecipes = (searchQuery, filter) => {
    let filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter) {
      filtered = filtered.filter((recipe) => recipe.category === filter);
    }

    setFilteredRecipes(filtered);
  };

  return (
    <Container>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        {/* אייקונים בצד שמאל */}
        <Box>
          <IconButton onClick={() => navigate("/favorites")}>
            <Favorite />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
          {user && user.isAdmin && (
            <IconButton onClick={() => navigate("/add-recipe")}>
              <AddCircle />
            </IconButton>
          )}
        </Box>

        {/* שם האתר */}
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Nono
        </Typography>
      </Box>

      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="navigation tabs"
          centered
        >
          <Tab label="Home" />
          <Tab label="Favorites" />
        </Tabs>
      </Box>

      {/* שורת חיפוש */}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Search Recipes"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      {/* פילטור לפי סוגי המתכונים */}
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          select
          label="Filter by Category"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
          variant="outlined"
        >
          <option value="">All</option>
          <option value="Dessert">Dessert</option>
          <option value="Starter">Starter</option>
          <option value="Main">Main</option>
        </TextField>
      </Box>

      {/* הצגת המתכונים */}
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{recipe.title}</Typography>
                <Typography variant="body2">{recipe.description}</Typography>
                {/* אפשר להוסיף גם תמונה של המתכון כאן */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
