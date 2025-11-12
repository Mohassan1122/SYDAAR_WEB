import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaThList,
  FaSearch,
  FaBars,
  FaChevronRight,
} from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Navbar() {
  // const location = useLocation();
  // State for the custom dropdown functionality (since external JS isn't loaded)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Mock list of categories for the dropdown, based on the image
  const categories = [
    "Design",
    "Business",
    "Data Science",
    "Development",
    "Finance",
    "Health & Fitness",
    "Lifestyle",
    "Marketing",
    "Music",
    "Personal Development",
    "Photography",
    "Teaching & Academics",
  ];

  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleNav = () => setIsNavCollapsed(!isNavCollapsed);


  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-lg"
      style={{
        background: "var(--bg)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="container-fluid px-5">
        {/* Brand Logo and Mobile Toggler */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <img
            src={logo}
            alt="logo"
            className="img-fluid"
            style={{
              width: "150px",
              height: "25px",
              color: "var(--accent)",
            }}
          />
        </Link>

        {/* User controls (Cart/Avatar) - visible on all screens, but moved next to toggler on mobile */}
        <div className="d-flex order-lg-3 align-items-center">
          {/* Cart Icon / Notification */}
          <div className="ms-4 me-3">
            <Link
              to="/enrollment"
              className="position-relative text-light text-decoration-none"
            >
              <span>
                <i className="fs-6 small" style={{ color: "var(--accent)" }}>
                  {" "}
                  {/* <FaShoppingCart /> */}
                  Enrollments{" "}
                </i>
              </span>
              <span
                className="position-absolute translate-middle badge rounded-circle p-1"
                style={{
                  top: "0",
                  right: "-10px",
                  backgroundColor: "var(--accent)",
                  color: "var(--bg)",
                }}
              >
                3
              </span>
            </Link>
          </div>

          {/* User Avatar */}
          <div className="me-2 d-none d-sm-block">
            <Link to="/profile" className="text-light text-decoration-none">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                M
              </div>
            </Link>
          </div>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Collapsible Content: Links, Category, Search */}
        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          } order-lg-1`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto align-items-lg-center">
            {/* Category Dropdown (Responsive) */}
            <li className="nav-item dropdown me-lg-2 mb-lg-0 my-xsm-3">
              <button
                className="btn fw-medium dropdown-toggle w-100 w-lg-auto py-2" // w-100 on mobile
                type="button"
                onClick={toggleCategory}
                aria-expanded={isCategoryOpen}
                style={{
                  backgroundColor: "var(--card)",
                  color: "var(--accent)",
                  borderRadius: isCategoryOpen ? "0.5rem 0.5rem 0 0" : "0.5rem",
                  borderColor: "var(--card)",
                }}
              >
                <FaThList className="me-3" />
                Category
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-dark shadow-lg p-2 p-lg-3 ${
                  isCategoryOpen ? "show" : ""
                }`}
                aria-labelledby="categoryDropdown"
                style={{
                  backgroundColor: "var(--card)",
                  minWidth: "250px",
                  border: "none",
                  // On desktop, position below the button
                  position: "absolute",
                  zIndex: 1050,
                }}
              >
                {categories.map((category) => (
                  <li key={category}>
                    <Link
                      className="dropdown-item d-flex justify-content-between align-items-center text-light"
                      to={`/courses?category=${category}`}
                      onClick={() => setIsCategoryOpen(false)} // Close on click
                      style={{ borderRadius: "0.5rem" }}
                    >
                      {category}
                      <FaChevronRight className="small-mute small" />
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Search Bar (Responsive) */}
            <li className="nav-item me-lg-5 mb-lg-0">
              <div className="input-group" style={{ maxWidth: "400px" }}>
                <input
                  type="text"
                  className="form-control border-0 shadow-none"
                  placeholder="Search Courses..."
                  aria-label="Search"
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--text)",
                    borderTopLeftRadius: "0.5rem",
                    borderBottomLeftRadius: "0.5rem",
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                />
                <button
                  className="btn text-light "
                  type="button"
                  style={{
                    backgroundColor: "var(--accent)",
                    border: "none",
                    borderRadius: "0 0.5rem 0.5rem 0",
                  }}
                >
                  <FaSearch />
                </button>
              </div>
            </li>
          </ul>
        </div>

        <button
          className="btn btn-outline-light d-lg-none  my-xsm-3"
          onClick={() => {
            document
              .querySelector(".col-lg-2.d-none.d-lg-block")
              .classList.toggle("active");
            document
              .querySelector(".sidebar-overlay")
              .classList.toggle("active");
          }}
        >
          <FaBars />
        </button>
      </div>
    </nav>
  );
}
