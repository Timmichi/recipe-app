import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Outlet /> {/* A placeholder that renders the matched child route's component, allowing for nested routes and dynamic content areas. */}
      </main>
    </div>
  );
}

export default Layout;