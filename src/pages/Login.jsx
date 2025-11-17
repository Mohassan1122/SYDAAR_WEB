import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [keepLoggedIn, setKeepLoggedIn] = useState(true);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    console.log("📝 Form data before login:", formData);

    const result = await login(formData);

    if (result.success) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      // Show more detailed error message
      const errorMessage =
        result.error?.response?.data?.message ||
        result.error?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      console.error("Login error details:", result.error);
    }
  };

  return (
    <div className="container auth-wrappe">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 my-5">
          <div className="card card-auth p-4 rounded-4">
            <h3 className="mb-3">Login</h3>
            <p className="small-muted">Please enter your details to login</p>

            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label className="form-label small-muted">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="email@example.com"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small-muted">Password</label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  minLength={6}
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="keep"
                    checked={keepLoggedIn}
                    onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  />
                  <label
                    className="form-check-label small-muted"
                    htmlFor="keep"
                  >
                    Keep me Logged in
                  </label>
                </div>
                <Link to="/forgot-password" className="small-muted">
                  Forgot password?
                </Link>
              </div>

              <button
                className="btn btn-primary w-100"
                style={{ background: "var(--bg)" }}
                disabled={loading}
                type="submit"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="small-muted">or sign in with</small>
              <div className="mt-2">
                <button className="btn btn-outline-light btn-sm me-2">
                  Google
                </button>
                <button className="btn btn-outline-light btn-sm">Apple</button>
              </div>
            </div>

            <div className="text-center mt-4">
              <small className="small-muted">
                Don't have an account?{" "}
                <Link to="/register">Create Account</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
