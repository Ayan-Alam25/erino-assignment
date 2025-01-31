import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await login(formData);

    if (result.success) {
      toast.success(result.message);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    }

    if (result.error) {
      setError(result.message);
    }
  }

  return (
    <section className="form-container">
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <h1>Login</h1>

          {error != "" ? (
            <p
              style={{
                textAlign: "center",
                backgroundColor: "red",
                padding: "6px",
                margin: "5px 0 5px 0",
              }}
            >
              {error}
            </p>
          ) : null}

          <input
            type="email"
            placeholder="Enter your email"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Enter your password"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input type="submit" className="btn" />
        </form>

        <p style={{ color: "#333", textAlign: "left", marginTop: "20px" }}>
          Don't have an account?
          <span>
            {" "}
            <Link
              to="/register"
              style={{ color: "#1976d2", marginLeft: "10px", fontSize: "18px" }}
            >
              Sign up here
            </Link>
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default Login;
