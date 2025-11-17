import React from "react";
import { Link } from "react-router-dom";
import {
  FaPlay,
  FaDollarSign,
  FaCalendarAlt,
  FaLevelUpAlt,
  FaClock,
  FaCalculator,
  FaGraduationCap,
} from "react-icons/fa";


const IconMap = {
  FaClock: FaClock,
  FaCalculator: FaCalculator,
  FaGraduationCap: FaGraduationCap,
};

const stats = [
  { value: "21.2K", label: "Hours Spent", detail: "+5.2%", icon: "FaClock" },
  {
    value: "196/200",
    label: "Avg Test Result",
    detail: "+3.4%",
    icon: "FaCalculator",
  },
  {
    value: "12",
    label: "Courses Completed",
    detail: "+8.1%",
    icon: "FaGraduationCap",
  },
];

const courses = [
  { name: "Mobile Design", progress: 75, color: "#6366F1" },
  { name: "UX Design Foundations", progress: 85, color: "#3B82F6" },
  { name: "UI Components", progress: 60, color: "#F97316" },
];

const quiz = [
  {
    name: "Typography Test",
    time: "Today, 10:30 AM",
    grade: "192/200",
    status: "Completed",
    isUpcoming: false,
  },
  {
    name: "Inclusive Design Test",
    time: "Tomorrow, 11:00 AM",
    grade: "196/200",
    status: "Completed",
    isUpcoming: false,
  },
  {
    name: "Accessibility Quiz",
    time: "Fri, 3:00 PM",
    grade: "120/200",
    status: "Upcoming",
    isUpcoming: true,
  },
];

const StatCard = ({ stat }) => {
  const Icon = IconMap[stat.icon];

  // Add a fallback check for safety
  if (!Icon) return null;

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div
        className="p-4 text-center rounded-3 shadow-sm"
        style={{ backgroundColor: "" }}
      >
        <Icon className="fa-2x mb-3" style={{ color: "var(--accent)" }} />
        <h3 className="fw-bold mb-1 text-secondary">{stat.value}</h3>
        <p className="text-muted mb-0">{stat.label}</p>
        <small className="text-success">{stat.detail}</small>
      </div>
    </div>
  );
};


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

const AssignmentRow = ({ assignment }) => (
  <div
    className="d-flex justify-content-between align-items-center py-3 border-bottom"
    style={{ borderColor: "rgba(255,255,255,0.08)" }}
  >
    <div className="d-flex align-items-center">
      <i className="fas fa-file-alt me-3 text-muted"></i>
      <div>
        <h6 className="mb-0 fw-bold text-light">{assignment.name}</h6>
        <small className="text-muted">{assignment.time}</small>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <span className="me-4 text-muted">{assignment.grade}</span>
      {assignment.isUpcoming ? (
        <>
          <Link
            to="#"
            className="btn btn-sm btn-primary me-2"
            style={{ background: "var(--bg)" }}
          >
            Join Class
          </Link>
          <Link to="#" className="btn btn-sm btn-outline-light text-muted">
            Reschedule
          </Link>
        </>
      ) : (
        <span className="badge bg-success bg-opacity-75">
          {assignment.status}
        </span>
      )}
    </div>
  </div>
);


export default function Dashboard() {
  return (
    <div className="col-lg-12">
      <div className="row gx-4">
        <div className="col-lg-9 p-5">
          <h1 className="pb-3">Hi Alysia !!! </h1>
          {/* Stats Section */}
          <div className="row mb-5">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          {/* Courses */}
          <h4 className="fw-bold mb-3">My Courses</h4>
          <div className="row mb-5">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>

          {/* quiz */}
          <h4 className="fw-bold mb-3">Quiz Status</h4>
          <div className="p-4 shadow-sm" style={{ backgroundColor: "#BC81FB" }}>
            {quiz.map((assignment, index) => (
              <AssignmentRow key={index} assignment={assignment} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-3">
          <div className="p-4 rounded-4 shadow-sm h-100">
            <span className="badge bg-primary my-3 fw-bold">PRO</span>
            <h4 className="fw-bold mb-3">Mobile Design</h4>
            <p className="text-muted mb-4">
              Learn how to design modern mobile interfaces that delight users.
            </p>

            <h6 className="text-uppercase text-muted mb-2 fw-bold">
              Takeaway Skills
            </h6>
            <div className="d-flex flex-wrap mb-4">
              {["UI Design", "Layout", "Mobile Design"].map((skill) => (
                <span
                  key={skill}
                  className="badge rounded-pill me-2 mb-2"
                  style={{ backgroundColor: "#1E1E2F", color: "#E5E7EB" }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <ul className="list-unstyled text-muted small">
              <li className="mb-2">
                <FaLevelUpAlt className="fas  me-2 text-warning" /> Advanced
                Level
              </li>
              <li className="mb-2">
                <FaCalendarAlt className="me-2 text-primary" /> 2 Weeks Duration
              </li>
              <li className="mb-2">
                <FaClock className="me-2 text-info" /> 12:00–13:00
              </li>
              <li className="mb-2">
                <FaDollarSign className=" me-2 text-success" /> $360
              </li>
            </ul>

            <Link to="/quiz/start" className="btn btn-primary w-100 mt-3">
              <FaPlay className=" me-2" />
              Start New Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
