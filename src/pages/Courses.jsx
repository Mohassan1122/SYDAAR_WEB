import React, { useState, useEffect } from "react";
import courseImg from "../assets/course.jpg";
import { FaStar, FaTh, FaList } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Courses() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [sortBy, setSortBy] = useState("Most Popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const categories = [
    "All",
    "Design",
    "Office Productivity",
    "Personal Development",
    "IT & Software",
    "Business",
    "Marketing",
    "Lifestyle",
    "Photography & Video",
    "Music",
    "Teaching & Academics",
    "Health & Fitness",
  ];

  const courses = [
    {
      title: "Photography Masterclass: A Complete Guide",
      desc: "This online photography course will teach you how to take amazing images and master your camera.",
      level: "Beginner",
      category: "Design",
      price: "$49.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "",
    },
    {
      title: "Boost Your Productivity: Adapt, Improve, Do!",
      desc: "Learn how to manage your time and improve productivity effectively.",
      level: "Beginner",
      category: "Office Productivity",
      price: "Free",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "Free",
    },
    {
      title: "Succeed, Influence, and Inspire as a Woman in Leadership",
      desc: "Learn leadership skills that empower you to make an impact in your organization.",
      level: "All Levels",
      category: "Personal Development",
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
      category: "Marketing",
      price: "$27.00",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "",
    },
    {
      title: "Building Influence at Work",
      desc: "Develop the skills to communicate and influence effectively in your career.",
      level: "All Levels",
      category: "Marketing",
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
      category: "Marketing",
      price: "Free",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "Free",
    },
    {
      title: "Building Influence at Work",
      desc: "Develop the skills to communicate and influence effectively in your career.",
      level: "All Levels",
      category: "Office Productivity",
      price: "Free",
      rating: 5,
      reviews: 2,
      img: courseImg,
      tag: "Free",
    },
  ];

  // Simulate loading / error
  useEffect(() => {
    setLoading(true);
    setError(false);
    const timer = setTimeout(() => {
      setLoading(false);
      // Uncomment to simulate error
      // setError(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // FILTER + SORT LOGIC
  let filteredCourses = courses.filter((c) => {
    const categoryMatch =
      selectedCategory === "All" || c.category === selectedCategory;
    const levelMatch =
      selectedLevel === "All Levels" || c.level === selectedLevel;
    const priceMatch =
      selectedPrice === "All" ||
      (selectedPrice === "Free" && c.price === "Free") ||
      (selectedPrice === "Paid" && c.price !== "Free");

    return categoryMatch && levelMatch && priceMatch;
  });

  if (sortBy === "Highest Rated") {
    filteredCourses = filteredCourses.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Price: Low–High") {
    filteredCourses = filteredCourses.sort((a, b) => {
      const priceA =
        a.price === "Free" ? 0 : parseFloat(a.price.replace("$", ""));
      const priceB =
        b.price === "Free" ? 0 : parseFloat(b.price.replace("$", ""));
      return priceA - priceB;
    });
  }

  // Pagination logic
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // CATEGORY BAR
  const CategoryBar = () => (
    <div
      className="d-flex gap-2 mb-4 pb-2"
      style={{
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
      }}
    >
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => setSelectedCategory(cat)}
          className={`btn px-3 py-2 rounded-pill ${
            selectedCategory === cat ? "btn-primary" : "btn-outline-secondary"
          }`}
          style={{
            flexShrink: 0,
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );

  // GRID CARD VIEW
  const GridView = () => (
    <div className="row">
      {currentCourses.length === 0 ? (
        <p className="text-center">No courses found.</p>
      ) : (
        currentCourses.map((course, i) => (
          <div className="col-md-6 col-lg-3 mb-4" key={i}>
            <div className="card shadow-sm border-0 h-100">
              <div className="position-relative">
                <Link to={`/course/${i}`} className="text-decoration-none">
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
                    <button className="btn btn-primary btn-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  // LIST CARD VIEW
  const ListView = () => (
    <div className="row">
      {currentCourses.length === 0 ? (
        <p className="text-center">No courses found.</p>
      ) : (
        currentCourses.map((course, i) => (
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
                      <span className="fw-bold text-primary">
                        {course.price}
                      </span>
                      <button className="btn btn-primary btn-sm">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-5">
        <p className="text-center">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <p className="text-center text-danger">
          Something went wrong. Please check your internet connection.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <small className="text-muted">
            Showing {filteredCourses.length} courses
          </small>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap">
          {/* VIEW MODE */}
          <div className="btn-group" role="group">
            <button
              className={`btn btn-outline-secondary ${
                viewMode === "grid" ? "active" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh />
            </button>

            <button
              className={`btn btn-outline-secondary ${
                viewMode === "list" ? "active" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </div>

          {/* FILTER DROPDOWN */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {selectedLevel}
            </button>
            <ul className="dropdown-menu">
              {["All Levels", "Beginner", "Intermediate", "Advanced"].map(
                (lvl, i) => (
                  <li key={i}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedLevel(lvl)}
                    >
                      {lvl}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* PRICE FILTER */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {selectedPrice === "All" ? "Price" : selectedPrice}
            </button>
            <ul className="dropdown-menu">
              {["All", "Free", "Paid"].map((price, i) => (
                <li key={i}>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedPrice(price)}
                  >
                    {price}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* SORT */}
          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {sortBy}
            </button>
            <ul className="dropdown-menu">
              {["Most Popular", "Highest Rated", "Price: Low–High"].map(
                (sort, i) => (
                  <li key={i}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSortBy(sort)}
                    >
                      {sort}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <CategoryBar />

      {/* Courses */}
      {viewMode === "grid" ? <GridView /> : <ListView />}

      {/* PAGINATION */}
      <div className="d-flex justify-content-center mt-4 gap-2 flex-wrap">
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`btn btn-sm ${
              currentPage === idx + 1 ? "btn-primary" : "btn-outline-secondary"
            }`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
