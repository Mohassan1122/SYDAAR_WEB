import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    organisation_id: ""
  });
  const [agree, setAgree] = useState(false);
  const { register, organisations, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.password || !formData.organisation_id) {
      toast.error("Please fill all fields");
      return;
    }

    if (!agree) {
      toast.error("Please agree to terms of service");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    const result = await register(formData);

    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="container auth-wrappe">
      <div className="row justify-content-center my-5">
        <div className="col-lg-5 col-md-7">
          <div className="card card-auth p-4 rounded-4">
            <h3>Create an account</h3>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="my-3">
                <label className="form-label">Choose Your Organization</label>
                <select
                  className="form-select"
                  name="organisation_id"
                  value={formData.organisation_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Your Organization</option>
                  {organisations.map(org => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small-muted">Full Name</label>
                <input
                  className="form-control"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small-muted">Email</label>
                <input
                  className="form-control"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email address"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label small-muted">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  minLength={6}
                />
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="agree"
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    required
                  />
                  <label className="form-check-label small-muted" htmlFor="agree">
                    By continuing, you agree to our terms of service
                  </label>
                </div>
              </div>

              <button
                className="btn btn-primary w-100"
                style={{ background: "var(--bg)" }}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
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
