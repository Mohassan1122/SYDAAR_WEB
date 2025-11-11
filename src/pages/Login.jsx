import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { findUserByEmail } from "../utils/fakeAuth";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      toast.error("Invalid email or password");
      return;
    }
    // fake login: mark session in localStorage
    localStorage.setItem(
      "sydaar_session",
      JSON.stringify({ email: user.email })
    );
    toast.success("Login successful");
    nav("/dashboard");
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="email address"
                />
              </div>
              <div className="mb-3">
                <label className="form-label small-muted">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="keep"
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

              <button className="btn btn-primary w-100" style={{ background: "var(--bg)" }}>
                Login
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
