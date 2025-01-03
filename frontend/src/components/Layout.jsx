import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout() {
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
