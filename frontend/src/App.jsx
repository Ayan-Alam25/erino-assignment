import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
