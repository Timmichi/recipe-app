import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api";
import { AUTH_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (!token) {
      setIsAuthorized(false);
      return;
    }

    try {
      await api.get("/user/me/"); // Using the dedicated user endpoint
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
      localStorage.removeItem(AUTH_TOKEN); // Clear invalid token
    }
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
