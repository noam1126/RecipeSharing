import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const isAuthenticated = localStorage.getItem("authToken"); // בודק אם יש טוקן

  return (
    <Router>
      <Routes>
        {/* אם לא מחובר, עובר לדף התחברות */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
        />

        {/* עמוד התחברות */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />}
        />

        {/* עמוד הבית */}
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />

        {/* עמוד הרשמה */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
