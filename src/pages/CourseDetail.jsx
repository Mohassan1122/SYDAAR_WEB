import React, { useState } from "react"; // Added useState import
import { Link } from "react-router-dom";
import BannerImg from "../assets/img7.jpg";
import {
  FaPlayCircle,
  FaFileAlt,
  FaQuestionCircle,
  FaPencilAlt,
  FaProjectDiagram,
  FaCircle,
  FaCheckCircle,
  FaLock,
  FaCheck,
  FaUser,
  FaStar,
} from "react-icons/fa";
export default function CourseDetail() {
  // const { id } = useParams();

  // Fixed: Moved useState inside component and before any logic
  const [curriculum, setCurriculum] = useState([
    {
      id: 1,
      title: "IT background",
      duration: "4h 30m",
      expanded: true,
      modules: [
        {
          id: 1,
          title: "Introduction to IT Infrastructure",
          type: "video",
          duration: "45m",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: true,
        },
        {
          id: 2,
          title: "Networking Fundamentals",
          type: "video",
          duration: "1h 15m",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: true,
        },
        {
          id: 3,
          title: "Database Systems Overview",
          type: "reading",
          duration: "30m",
          completed: false,
        },
        {
          id: 4,
          title: "IT Background Quiz",
          type: "quiz",
          duration: "1h",
          completed: false,
        },
      ],
    },
    {
      id: 2,
      title: "Key concepts",
      duration: "3h 45m",
      expanded: false,
      modules: [
        {
          id: 5,
          title: "Data Modeling Principles",
          type: "video",
          duration: "1h 30m",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 6,
          title: "Entity Relationship Diagrams",
          type: "video",
          duration: "45m",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 7,
          title: "Normalization Techniques",
          type: "reading",
          duration: "45m",
          completed: false,
        },
        {
          id: 8,
          title: "Practice Exercises",
          type: "exercise",
          duration: "45m",
          completed: false,
        },
      ],
    },
    {
      id: 3,
      title: "Apply the principles",
      duration: "7h 00m",
      expanded: false,
      modules: [
        {
          id: 9,
          title: "Real-world Case Study",
          type: "video",
          duration: "2h 30m",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
        },
        {
          id: 10,
          title: "Hands-on Project",
          type: "project",
          duration: "3h 30m",
          completed: false,
        },
        {
          id: 11,
          title: "Final Assessment",
          type: "quiz",
          duration: "1h",
          completed: false,
        },
      ],
    },
  ]);

  const toggleSection = (sectionId) => {
    setCurriculum(
      curriculum.map((section) => ({
        ...section,
        expanded: section.id === sectionId ? !section.expanded : false,
      }))
    );
  };

  const getModuleIcon = (type) => {
    switch (type) {
      case "video":
        return <FaPlayCircle className="text-muted" />;
      case "reading":
        return <FaFileAlt className="text-muted" />;
      case "quiz":
        return <FaQuestionCircle className="text-muted" />;
      case "exercise":
        return <FaPencilAlt className="text-muted" />;
      case "project":
        return <FaProjectDiagram className="text-muted" />;
      default:
        return <FaCircle className="text-muted" />;
    }
  };

  const getModuleBadgeColor = (type) => {
    switch (type) {
      case "video":
        return "bg-primary";
      case "reading":
        return "bg-info";
      case "quiz":
        return "bg-warning";
      case "exercise":
        return "bg-success";
      case "project":
        return "bg-purple";
      default:
        return "bg-secondary";
    }
  };

  // Mock data - in real app, you'd fetch this based on the id
  const course = {
    id: 1,
    title: "Data Modeling Fundamentals",
    instructor: "Owen Christ",
    rating: 4.75,
    reviews: 4,
    students: 73,
    coursesCount: 42,
    price: 46,
    originalPrice: 76,
    discount: 39,
    level: "Beginner",
    duration: "15.3 hours",
    lectures: 4,
    subject: "Data Modeling",
    language: "Russian",
    description:
      "In this course, I take you from the fundamentals and concepts of data modeling all the way through a number of best practices and techniques that you'll need to build data models in your organization. You'll find many examples that clearly demonstrate the key concepts and techniques covered throughout the course.",
    longDescription:
      "Organisations, or groups of organisations, may establish the need for master data management when they hold more than one copy of data about a business entity. Holding more than one copy of this master data inherently means that there is an inefficiency in maintaining a 'single version of the truth' across all copies. Unless people, processes and technology are in place to ensure that the data values are kept aligned across all copies, it is almost inevitable that different versions of information about a business entity will be held.",
    tags: ["big data", "data", "data analysis", "data modeling"],
    prerequisites: ["Artificial Intelligence & Machine Learning"],
    learningObjectives: [
      "Ready to begin working on real-world data modeling projects",
      "Find a new position involving data modeling",
      "Expanded responsibilities as part of an existing role",
    ],
    requirements: [
      "Basic understanding of data management concepts and constructs such as relational database tables",
      "Know how different pieces of data logically relate to one another",
    ],
    targetAudience: [
      "A business analyst",
      "Data engineer, or database designer",
      "Who desires to build a personal toolbox of data modeling best practices and techniques",
    ],
    materials: ["Videos", "Booklets", "Audio"],
    categories: [
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
    ],
    relatedCourses: [
      {
        title: "Artificial Intelligence: Reinforcement Learning",
        price: 46,
        originalPrice: 76,
      },
      {
        title: "Statistics for Data Science and Business Analysis",
        price: 25,
        originalPrice: null,
      },
      {
        title: "Advanced Data Modeling Techniques",
        price: 56,
        originalPrice: 89,
      },
    ],
  };

  // Fixed: Calculate total duration properly
  const calculateTotalDuration = () => {
    return (
      curriculum
        .reduce((total, section) => {
          // Extract hours from duration string like "4h 30m"
          const hoursMatch = section.duration.match(/(\d+)h/);
          const minutesMatch = section.duration.match(/(\d+)m/);
          const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
          const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
          return total + hours + minutes / 60;
        }, 0)
        .toFixed(1) + "h"
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Main Content */}
        <div className="col-lg-8">
          <div className="p-4">
            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link
                    to="/dashboard"
                    className="text-decoration-none"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    to="/courses"
                    className="text-decoration-none"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Courses
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active"
                  style={{ color: "var(--text)" }}
                >
                  {course.title}
                </li>
              </ol>
            </nav>

            {/* Prerequisites Alert */}
            <div
              className="alert alert-success mb-4"
              style={{
                // backgroundColor: "rgba(255,193,7,0.1)",
                borderColor: "rgba(255,193,7,0.3)",
              }}
            >
                 <div
                          style={{
                            width: "100%",
                            height: "200px",
                            overflow: "hidden",
                            background: "white",
                          }}
                        >
                          <img src={BannerImg} alt="Profile" className="img-fluid" />
                        </div>
              <ul className="mb-0 small">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>{prereq}</li>
                ))}
              </ul>
            </div>

            {/* About This Course */}
            <div className="mb-5">
              <h4 className="fw-bold mb-3">About This Course</h4>
              <p className="text-muted mb-4">{course.description}</p>
              <p className="text-muted">{course.longDescription}</p>

              {/* Tags */}
              <div className="d-flex flex-wrap gap-2 mt-3">
                {course.tags.map((tag, index) => (
                  <span key={index} className="badge bg-light text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="mb-5">
              <h5 className="fw-bold mb-3">Learning Objectives</h5>
              <ul className="list-unstyled">
                {course.learningObjectives.map((objective, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <i className="fas fa-check text-success me-2 mt-1"></i>
                    <span className="text-muted">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="mb-5">
              <h5 className="fw-bold mb-3">Requirements</h5>
              <ul className="list-unstyled">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <i className="fas fa-check text-success me-2 mt-1"></i>
                    <span className="text-muted">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Audience
            <div className="mb-5">
              <h5 className="fw-bold mb-3">Target Audience</h5>
              <ul className="list-unstyled">
                {course.targetAudience.map((audience, index) => (
                  <li key={index} className="d-flex align-items-start mb-2">
                    <i className="fas fa-user text-primary me-2 mt-1"></i>
                    <span className="text-muted">{audience}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Curriculum */}
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">📘 Curriculum</h5>
                <span className="text-muted small">
                  {curriculum.reduce(
                    (total, section) => total + section.modules.length,
                    0
                  )}{" "}
                  Lessons • {calculateTotalDuration()}
                </span>
              </div>

              <div className="accordion" id="curriculumAccordion">
                {curriculum.map((section) => (
                  <div
                    key={section.id}
                    className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden"
                    style={{ backgroundColor: "var(--bg-light)" }}
                  >
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button fw-semibold ${
                          section.expanded ? "" : "collapsed"
                        }`}
                        type="button"
                        onClick={() => toggleSection(section.id)}
                        style={{
                          backgroundColor: section.expanded
                            ? "var(--accent)"
                            : "#f8f9fa",
                          color: section.expanded ? "#fff" : "var(--text)",
                          boxShadow: "none",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div className="d-flex justify-content-between text-dark align-items-center w-100">
                          <span>{section.title}</span>
                          <span
                            className={`badge ${
                              section.expanded
                                ? "bg-light text-dark"
                                : "bg-secondary bg-opacity-10 text-secondary"
                            }`}
                          >
                            {section.modules.length} Lessons •{" "}
                            {section.duration}
                          </span>
                        </div>
                      </button>
                    </h2>

                    <div
                      className={`accordion-collapse collapse ${
                        section.expanded ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body bg-white px-3 pt-3 pb-2">
                        {section.modules.map((module) => (
                          <div
                            key={module.id}
                            className="d-flex justify-content-between align-items-center mb-3 p-3 rounded-3 border"
                            style={{
                              borderColor: "#e9ecef",
                              transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#f9fafc")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor = "white")
                            }
                          >
                            <div className="d-flex align-items-center flex-grow-1">
                              <div className="me-3">
                                {module.completed ? (
                                  <FaCheckCircle className="text-success" />
                                ) : (
                                  getModuleIcon(module.type)
                                )}
                              </div>

                              <div>
                                <div className="fw-medium mb-1">
                                  {module.title}
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <span
                                    className={`badge ${getModuleBadgeColor(
                                      module.type
                                    )}`}
                                  >
                                    {module.type.charAt(0).toUpperCase() +
                                      module.type.slice(1)}
                                  </span>
                                  <small className="text-muted">
                                    {module.duration}
                                  </small>
                                </div>
                              </div>
                            </div>

                            <div className="d-flex align-items-center">
                              {module.completed ? (
                                <span className="badge bg-success bg-opacity-25 text-success">
                                  Completed
                                </span>
                              ) : (
                                <button className="btn btn-outline-primary btn-sm">
                                  Start
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Courses */}
            <div className="mb-5">
              <h5 className="fw-bold mb-3">Related Courses</h5>
              <div className="row">
                {course.relatedCourses
                  .slice(0, 2)
                  .map((relatedCourse, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="card h-100">
                        <div className="card-body">
                          <h6 className="fw-bold">{relatedCourse.title}</h6>
                          <div className="d-flex align-items-center gap-2">
                            <span className="fw-bold text-primary">
                              ${relatedCourse.price}
                            </span>
                            {relatedCourse.originalPrice && (
                              <>
                                <span className="text-muted text-decoration-line-through">
                                  ${relatedCourse.originalPrice}
                                </span>
                                <span className="badge bg-danger">
                                  {Math.round(
                                    (1 -
                                      relatedCourse.price /
                                        relatedCourse.originalPrice) *
                                      100
                                  )}
                                  % OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          <div className="p-4" style={{ backgroundColor: "var(--bg-light)" }}>
            {/* Price Card */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" // replace with your video ID
                    title="YouTube video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "100%", border: 0 }}
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Enroll now */}
            <div className="card border-0 shadow-sm mb-4">
               <div className="card-body">
                <div className="d-flex align-items-center gap-2 mb-3">
                  <h3 className="fw-bold text-primary mb-0">${course.price}</h3>
                  <span className="text-muted text-decoration-line-through">${course.originalPrice}</span>
                  <span className="badge bg-danger">{course.discount}% OFF</span>
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-primary">
                    Enroll Now
                  </button>

                </div>
              </div>
            </div>
            {/* Course Details */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Course Details</h6>
                <div className="row small">
                  <div className="col-6 mb-2">
                    <span className="text-muted">Level</span>
                    <div className="fw-medium">{course.level}</div>
                  </div>
                  <div className="col-6 mb-2">
                    <span className="text-muted">Duration</span>
                    <div className="fw-medium">{course.duration}</div>
                  </div>
                  <div className="col-6 mb-2">
                    <span className="text-muted">Lectures</span>
                    <div className="fw-medium">{course.lectures}</div>
                  </div>
                  <div className="col-6 mb-2">
                    <span className="text-muted">Subject</span>
                    <div className="fw-medium">{course.subject}</div>
                  </div>
                  <div className="col-12 mb-2">
                    <span className="text-muted">Language</span>
                    <div className="fw-medium">{course.language}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials Includes */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Material Includes</h6>
                <ul className="list-unstyled mb-0">
                  {course.materials.map((material, index) => (
                    <li key={index} className="d-flex align-items-center mb-1">
                      <i className="fas fa-check text-success me-2"></i>
                      <span className="text-muted small">{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Course Categories */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Course categories</h6>
                <div className="d-flex flex-wrap gap-2">
                  {course.categories.map((category, index) => (
                    <Link to="#" className="text-decoration-none">
                      <span key={index} className="badge bg-light text-muted">
                        {category}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructor */}
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="fw-bold mb-3">Your Instructors</h6>
                <div className="d-flex align-items-start mb-3">
                  <div
                    className="rounded-circle me-3"
                    style={{
                      width: "50px",
                      height: "50px",
                      background:
                        "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                    }}
                  ></div>
                  <div>
                    <h6 className="fw-bold mb-1">{course.instructor}</h6>
                    <div className="d-flex align-items-center mb-1">
                      <div className="text-warning small">{"★".repeat(5)}</div>
                      <small className="text-muted ms-1">
                        {course.rating}/5
                      </small>
                    </div>
                    <small className="text-muted">
                      {course.coursesCount} Courses • {course.reviews} Reviews •{" "}
                      {course.students} Students
                    </small>
                  </div>
                </div>
                <button className="btn btn-outline-primary btn-sm w-100">
                  + See more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
