import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, } from "react-icons/fa";

export default function QuizPage() {
  const courses = [
    { name: "Mobile Design", progress: 75, color: "#6366F1" },
    { name: "UX Design Foundations", progress: 85, color: "#3B82F6" },
    { name: "UI Components", progress: 60, color: "#F97316" },
  ];

  const CourseCard = ({ course }) => (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="p-4 rounded-3 shadow-sm"
        style={{
          backgroundColor: course.color + "20",
          borderLeft: `5px solid ${course.color}`,
        }}
      >
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="fw-bold" style={{ color: course.color }}>
            {course.name}
          </h5>
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: course.color + "40",
              borderRadius: "50%",
            }}
          ></div>
        </div>

        <p className="text-muted mt-3">Progress</p>
        <div
          className="progress mb-2"
          style={{ height: "8px", backgroundColor: "#2A2A40" }}
        >
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${course.progress}%`,
              backgroundColor: course.color,
            }}
            aria-valuenow={course.progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <small className="fw-bold" style={{ color: course.color }}>
          {course.progress}% Complete
        </small>
      </div>
    </div>
  );

  return (
    <div className="p-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb mb-0">
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
                aria-current="page"
                style={{ color: "var(--text)" }}
              >
                Quiz
              </li>
            </ol>
          </nav>
          <h3 className="fw-bold mb-0">Quiz Progress Overview</h3>
          <p className="text-muted small mt-1">
            Track your learning progress and course completion rate
          </p>
        </div> 

        <Link to="/quiz/start" className="btn btn-primary px-4">
          <FaPlay className=" me-2" />
          Start New Quiz
        </Link>
      </div>

      {/* Courses Progress Section */}
      <div className="row">
        {courses.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>

      {/* Active Quiz List */}
      <div className="mt-5">
        <h5 className="fw-bold mb-3">Upcoming & Completed Quizzes</h5>
        <div className="list-group shadow-sm">
          <div className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1">Typography Test</h6>
              <small className="text-muted">Today, 10:30 AM</small>
            </div>
            <span className="badge bg-success">Completed</span>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1">Inclusive Design Test</h6>
              <small className="text-muted">Tomorrow, 11:00 AM</small>
            </div>
            <span className="badge bg-success">Completed</span>
          </div>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1">Accessibility Quiz</h6>
              <small className="text-muted">Fri, 3:00 PM</small>
            </div>
            <span className="badge bg-warning text-dark">Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );
}
