import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../css/form.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { signup } = useContext(AuthContext);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await signup(formData);

    if (result.error) {
      setError(result.message);
    }

    if (result.success) {
      toast.success(result.message);
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/login");
    }
  }

  return (
    <section className="form-container">
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <h1>Signup</h1>

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
            type="text"
            placeholder="Enter your name"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
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
          Already have an account?
          <span>
            {" "}
            <Link
              to="/login"
              style={{ color: "#1976d2", marginLeft: "10px", fontSize: "18px" }}
            >
              Log in here
            </Link>
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default Register;
