import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import hero from "../assets/hero.png";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "chart-line" },
    { path: "/courses", label: "View Courses", icon: "book-open" },
    { path: "/quiz", label: "Quiz", icon: "tasks" },
    { path: "/leaderboard", label: "Leaderboard", icon: "trophy" },
    { path: "/settings", label: "Settings", icon: "cog" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="col-lg-2 d-none d-lg-block">
      <div
        className="p-4 h-100 shadow-sm"
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      >
        <div className="align-items-center mb-4">
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "white",
            }}
          >
            <img src={hero} alt="Profile" className="img-fluid" />
          </div>

          <div className="mt-3">
            <h5 className="fw-bold text-light mb-0">Alysia Dermott</h5>
            <small className="text-secondary">Profile</small>
          </div>
        </div>

        <ul className="nav flex-column mt-4">
          {menuItems.map((item) => (
            <li className="nav-item mb-2" key={item.label}>
              <Link
                to={item.path}
                className={`nav-link p-2 fw-medium rounded-3 ${
                  isActive(item.path) ? "active" : "text-light"
                }`}
                style={
                  isActive(item.path)
                    ? { backgroundColor: "var(--text)", color: "white" }
                    : {}
                }
              >
                <i className={`fas fa-${item.icon}`}></i> {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <Link to="/logout" className="text-light text-decoration-none">
            <i className="fas fa-sign-out-alt me-2"></i> Log Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Layout({ children }) {
  return (
    <div
      className="container-fluid overflow-hidden"
      style={{ minHeight: "100vh", color: "var(--text)" }}
    >
      <div className="row gx-0">
        <Sidebar />
        <div className="col-lg-10">{children}</div>
      </div>

      <div
        className="sidebar-overlay"
        onClick={() => {
          document
            .querySelector(".col-lg-2.d-none.d-lg-block")
            .classList.remove("active");
          document.querySelector(".sidebar-overlay").classList.remove("active");
        }}
      ></div>
    </div>
  );
}
