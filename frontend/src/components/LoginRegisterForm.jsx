import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

function LoginRegisterForm({ route, method }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formName = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { email, password };
      if (method === "register") {
        payload.name = name;
      }
      const res = await api.post(route, payload);
      if (method === "login") {
        if (res.data.token) {
          localStorage.setItem(AUTH_TOKEN, res.data.token);
          navigate("/");
        } else {
          throw new Error("No token received");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      // Improve error messaging
      console.error("Login error:", error);
      alert(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{formName}</h1>
      {method === "register" && (
        <input
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
      )}
      <input
        className="form-input"
        type="email" // Change to email type
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button
        className="form-button"
        type="submit"
        disabled={loading} // Add loading state
      >
        {loading ? "Loading..." : formName}
      </button>
    </form>
  );
}

export default LoginRegisterForm;