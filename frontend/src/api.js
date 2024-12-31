import axios from "axios";
import { AUTH_TOKEN } from "./constants";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    // Get CSRF token from cookie
    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default api;
