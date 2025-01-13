import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  MenuItem,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";
import { Favorite, Logout, AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage({ user, onLogout }) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Fetch recipes from the server
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRecipes(response.data);
        setFilteredRecipes(response.data); // in case of no filter, use all recipes
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) {
      onLogout(); // call logout callback
    }
    navigate("/login"); // Navigate to login page
  };

  // Handle search query
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    filterRecipes(value, filter);
  };

  // Handle filter changes
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    filterRecipes(searchQuery, value);
  };

  // Filter recipes based on search query and category
  const filterRecipes = (query, category) => {
    let filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    if (category) {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }

    setFilteredRecipes(filtered);
  };

  return (
    <Box
      sx={{ backgroundColor: "#F7F9FC", minHeight: "100vh", paddingBottom: 4 }}
    >
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#AEDFF7" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              color: "#2C3E50",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Nono
          </Typography>

          {/* Icons */}
          <Box>
            <IconButton
              sx={{ color: "#2C3E50" }}
              onClick={() => navigate("/favorites")}
            >
              <Favorite />
            </IconButton>
            <IconButton sx={{ color: "#2C3E50" }} onClick={handleLogout}>
              <Logout />
            </IconButton>
            <IconButton
              sx={{ color: "#2C3E50" }}
              onClick={() => navigate("/add-recipe")}
            >
              <AddCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Search and filter */}
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginY: 3,
            borderRadius: 3,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            backgroundColor: "#FFFFFF",
          }}
        >
          <TextField
            label="Search Recipes"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              flex: 2,
              minWidth: 250,
              "& .MuiOutlinedInput-root": { borderRadius: 20 },
            }}
          />
          <TextField
            select
            label="Filter by Category"
            value={filter}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 150,
              "& .MuiOutlinedInput-root": { borderRadius: 20 },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Dessert">Dessert</MenuItem>
            <MenuItem value="Starter">Starter</MenuItem>
            <MenuItem value="Main">Main</MenuItem>
          </TextField>
        </Paper>

        {/* Displaying recipes */}
        <Grid container spacing={3}>
          {filteredRecipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe._id}>
              <Card
                onClick={() => navigate(`/recipes/${recipe._id}`)}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={`http://localhost:5000/${recipe.image}`} // לוודא ש- recipe.image מכיל את הנתיב היחסי
                  alt={recipe.title}
                  sx={{ objectFit: "cover" }}
                />

                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "bold",
                      marginBottom: 1,
                    }}
                  >
                    {recipe.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      color: "#7F8C8D",
                    }}
                  >
                    {recipe.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
