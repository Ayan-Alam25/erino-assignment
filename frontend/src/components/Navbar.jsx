import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navbar.css";
import AuthContext from "../context/AuthContext";
import { buttonBaseClasses } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <section className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        <h1>
          <span>Expense</span> Tracker
        </h1>
      </div>

      <div className="nav">
        {user?._id ? (
          <button onClick={() => logout()} className="logout">
            Logout
          </button>
        ) : (
          <Link to="/login" className="link">
            Login
          </Link>
        )}
      </div>
    </section>
  );
};

export default Navbar;
