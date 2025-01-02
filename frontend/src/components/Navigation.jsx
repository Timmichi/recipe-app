import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate("/login");
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        <h1>Recipe Manager</h1>
      </Link>
      <nav>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}

export default Navigation;