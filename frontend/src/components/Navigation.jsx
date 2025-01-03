import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";
import { useEffect, useState } from "react";
import api from "../api";

function Navigation() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    fetchName();
  }, []);

  const fetchName = async () => {
    try {
      const res = await api.get(`/user/me/`);
      setName(res.data.name);
    } catch (error) {
      console.error("Error fetching name", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1>{name}'s Recipes!</h1>
      </Link>
      <nav>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Navigation;
