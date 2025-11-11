import React, { useState } from "react";
import courseImg from "../assets/course.jpg";
import { FaStar, FaTh, FaList, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Courses() {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const courses = [
    {
      title: "Photography Masterclass: A Complete Guide",
      desc: "This online photography course will teach you how to take amazing images and master your camera.",
      level: "Beginner",
      category: "Photography Fundamentals",
      price: "$49.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "FREE",
    },
    {
      title: "Boost Your Productivity: Adapt, Improve, Do!",
      desc: "Learn how to manage your time and improve productivity effectively.",
      level: "Beginner",
      category: "Productivity",
      price: "Free",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "",
    },
    {
      title: "Succeed, Influence, and Inspire as a Woman in Leadership",
      desc: "Learn leadership skills that empower you to make an impact in your organization.",
      level: "All Levels",
      category: "Leadership",
      price: "$75.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "",
    },
    {
      title: "Building Influence at Work",
      desc: "Develop the skills to communicate and influence effectively in your career.",
      level: "All Levels",
      category: "Career Development",
      price: "$42.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "FREE",
    },
    {
      title: "Building Influence at Work",
      desc: "Develop the skills to communicate and influence effectively in your career.",
      level: "All Levels",
      category: "Career Development",
      price: "$42.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "FREE",
    },
    {
      title: "Building Influence at Work",
      desc: "Develop the skills to communicate and influence effectively in your career.",
      level: "All Levels",
      category: "Career Development",
      price: "$42.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "",
    },
    {
      title: "Building Influence at Work",
      desc: "Develop the skills to communicate and influence effectively in your career.",
      level: "All Levels",
      category: "Career Development",
      price: "$42.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "",
    },
  ];

  // Grid View Component
  const GridView = () => (
    <div className="row">
      {courses.map((course, i) => (
        <div className="col-md-6 col-lg-3 mb-4" key={i}>
          <div className="card shadow-sm border-0 h-100">
            <div className="position-relative">
              <Link to="/courses/1" className="text-decoration-none">
                {/* <Link to={`/course/${i}`} className="text-decoration-none"> */}
                <img
                  src={course.img}
                  alt={course.title}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              </Link>
              {course.tag && (
                <span
                  className="badge bg-success position-absolute"
                  style={{ top: "10px", left: "10px" }}
                >
                  {course.tag}
                </span>
              )}
            </div>

            <div className="card-body">
              <span className="badge bg-light text-primary mb-2">
                {course.level}
              </span>
              <p className="text-primary small fw-medium mb-2">
                {course.category}
              </p>
              <h6 className="fw-bold">{course.title}</h6>
              <p className="text-muted small mb-3">{course.desc}</p>

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">{course.price}</span>
                <div className="d-flex align-items-center text-warning">
                  {[...Array(course.rating)].map((_, idx) => (
                    <FaStar key={idx} size={14} />
                  ))}
                  <small className="text-muted ms-1">({course.reviews})</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // List View Component
  const ListView = () => (
    <div className="row">
      {courses.map((course, i) => (
        <div className="col-12 mb-4" key={i}>
          <div className="card shadow-sm border-0">
            <div className="row g-0">
              <div className="col-md-3">
                <div className="position-relative h-100">
                  <Link to={`/course/${i}`} className="text-decoration-none">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="img-fluid h-100"
                    style={{ objectFit: "cover", minHeight: "200px" }}
                    />
                  </Link>
                  {course.tag && (
                    <span
                      className="badge bg-success position-absolute"
                      style={{ top: "10px", left: "10px" }}
                    >
                      {course.tag}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-9">
                <div className="card-body d-flex flex-column h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className="badge bg-light text-primary me-2">
                        {course.level}
                      </span>
                      <span className="text-primary small fw-medium">
                        {course.category}
                      </span>
                    </div>
                    <div className="d-flex align-items-center text-warning">
                      {[...Array(course.rating)].map((_, idx) => (
                        <FaStar key={idx} size={14} />
                      ))}
                      <small className="text-muted ms-1">
                        ({course.reviews})
                      </small>
                    </div>
                  </div>

                  <h6 className="fw-bold mb-2">{course.title}</h6>
                  <p className="text-muted small mb-3 flex-grow-1">
                    {course.desc}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-primary">{course.price}</span>
                    <button className="btn btn-primary btn-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <div className="mb-4">
            <small className="small-muted">
              <Link
                to="/dashboard"
                className="small-muted text-decoration-none"
              >
                Home
              </Link>
              <FaChevronRight className="mx-2" style={{ fontSize: "0.6rem" }} />
              Courses
            </small>
          </div>
          <p className="text-muted mb-0">
            We found {courses.length} courses available for you
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">See</span>

          {/* View Mode Toggle */}
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                viewMode === "grid" ? "active" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh />
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                viewMode === "list" ? "active" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filters
            </button>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  All Levels
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Beginner
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Intermediate
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Advanced
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Courses - Dynamic View */}
      {viewMode === "grid" ? <GridView /> : <ListView />}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-5">
        <nav>
          <ul className="pagination pagination-sm">
            <li className="page-item disabled">
              <Link
                className="page-link small-muted bg-transparent border-0"
                to="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            <li className="page-item active">
              <Link
                className="page-link bg-primary border-0"
                to="#"
                style={{
                  backgroundColor: "var(--accent)",
                  borderColor: "var(--accent)",
                }}
              >
                1
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link small-muted bg-transparent border-0"
                to="#"
              >
                2
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link small-muted bg-transparent border-0"
                to="#"
              >
                ...
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link small-muted bg-transparent border-0"
                to="#"
              >
                7
              </Link>
            </li>
            <li className="page-item">
              <Link
                className="page-link small-muted bg-transparent border-0"
                to="#"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
