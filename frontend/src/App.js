
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Products from "./pages/Products";
import Dashboard from "./pages/private/Dashboard";
import Login from "./pages/Login/Login";  // Assuming Login is defined

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route for Login */}
          <Route path="/login" element={<Login setToken={setToken} />} />

          {/* Protected route: If the user is authenticated, navigate to Home, else login */}
          <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          {/* Protected routes wrapped with Layout */}
          <Route element={token ? <Layout /> : <Navigate to="/login" />}>
            <Route path="/home" element={<Home />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;

