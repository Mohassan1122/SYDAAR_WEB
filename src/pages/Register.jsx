import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storeUser, findUserByEmail } from "../utils/fakeAuth";
import Footer from "../components/Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (findUserByEmail(email)) {
      toast.error("Email already registered");
      return;
    }
    storeUser({ name, email, password });
    toast.success("Account created! Please login.");
    nav("/");
  };

  return (
    <div className="container auth-wrappe">
      <div className="row justify-content-center my-5">
        <div className="col-lg-5 col-md-7">
          <div className="card card-auth p-4 rounded-4">
            <h3>Create an account</h3>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label className="form-label small-muted">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-3">
                <label className="form-label small-muted">Email</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email address"
                />
              </div>
              <div className="mb-3">
                <label className="form-label small-muted">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="agree"
                    type="checkbox"
                    required
                  />
                  <label
                    className="form-check-label small-muted"
                    htmlFor="agree"
                  >
                    By continuing, you agree to our terms of service
                  </label>
                </div>
              </div>

              <button
                className="btn btn-primary w-100"
                style={{ background: "var(--bg)" }}
              >
                Sign Up
              </button>
            </form>

            <div className="text-center mt-3">
              <small className="small-muted">
                Already have an account? <Link to="/login">Login here</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
       <Footer />
    </div>
  );
}
