import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero.png";
import Footer from "../components/Footer";

const FeatureIcon = ({ icon }) => (
  <i className={`feature-icon fas fa-${icon}`}></i>
);

export default function Onboarding() {
  const features = [
    {
      icon: "brain",
      title: "Gamified Learning",
      description:
        "Transform education into a fun game with points, levels, and leaderboards.",
    },
    {
      icon: "trophy",
      title: "Earn Badges & Rewards",
      description:
        "Achieve milestones and earn exclusive badges for your performance and consistency.",
    },
    {
      icon: "user-graduate",
      title: "Structured Courses",
      description:
        "Access curated courses and detailed modules on a variety of essential topics.",
    },
    {
      icon: "clock",
      title: "Daily Quizzes",
      description:
        "Challenge yourself with quick, AI-generated quizzes to test your daily knowledge.",
    },
  ];

  return (
    <div className="container py-5">
      {/* Hero Section - Matches Onboarding 1.1 UI style */}
      <section className="row align-items-center justify-content-between mb-5 py-5">
        <div className="col-lg-6 hero-text text-lg-start text-center mb-4 mb-lg-0">
          <h1 className="mb-4">Your journey to knowledge starts here.</h1>
          <p className="lead small-muted mb-4">
            Learn, compete, and grow with SYDAAR's cutting-edge gamified
            learning experience. Master new skills and challenge your peers on
            the leaderboard.
          </p>
          <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
            <Link
              to="/register"
              className="btn btn-primary btn-lg px-5"
              style={{ background: "var(--bg)" }}
            >
              Get Started for Free
            </Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg px-5">
              <i className="fas fa-sign-in-alt me-2"></i> Login
            </Link>
          </div>
        </div>
        <div className="col-lg-5 text-center">
          {/* Placeholder for the main hero image/illustration */}
          <div
            style={{
              height: "350px",
              background: "var(--card)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <img
              src={hero}
              alt="Welcome"
              className="img-fluid mb-4"
              style={{ maxWidth: "400px" }}
            />
          </div>
        </div>
      </section>

      <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} className="my-5" />

      {/* Feature Section - Details the app's offerings */}
      <section className="py-5">
        <h2 className="text-center fw-bold mb-5">
          What You'll Gain with SYDAAR
        </h2>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="card text-center h-100 p-4 rounded-4 shadow ">
                <FeatureIcon icon={feature.icon} />
                <h4 className="fw-bold mt-2 mb-2">{feature.title}</h4>
                <p className="small-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Simple and direct call to action */}
      <section className="text-center py-5 mt-5">
        <h2 className="fw-bold mb-3">Ready to Start Your Learning Journey?</h2>
        <p className="lead small-muted mb-4">
          Join thousands of learners achieving their goals with SYDAAR today.
        </p>
        <Link
          to="/register"
          className="btn btn-primary btn-lg px-5"
          style={{ background: "var(--bg)" }}
        >
          Create Free Account
        </Link>
      </section>

      <Footer />
    </div>
  );
}
