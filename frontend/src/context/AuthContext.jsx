import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  const signup = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const isTokenExpired = () => {
    const expirationTime = localStorage.getItem("tokenExpiry");

    if (!expirationTime || Date.now() > parseInt(expirationTime, 10)) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");
      alert("Your token has expired");
      navigate("/login");
      return true;
    } else {
      return false;
    }
  };

  const login = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("tokenExpiry", expirationTime.toString());
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (token && tokenExpiry && Date.now() < parseInt(tokenExpiry)) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    } else {
      localStorage.clear();
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const contextValue = {
    signup,
    login,
    isTokenExpired,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
