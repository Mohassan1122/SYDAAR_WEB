import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createReset, findUserByEmail } from "../utils/fakeAuth";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    const user = findUserByEmail(email);
    if (!user) {
      toast.error("No account found with that email");
      return;
    }

    const payload = createReset(email);
    /* In production you'd email the code. Here we show it via toast + store */
    toast.success("Password reset code generated. Check the UI (for demo).");
    // show code in console for demo
    console.log("Reset code (demo):", payload.code);
    // Navigate to verify reset page
    nav("/verify-reset");
  };

  return (
    <div className="container auth-wrapper">
      <div className="row justify-content-center my-5">
        <div className="col-lg-5 col-md-7">
          <div className="card card-auth p-4">
            <h3 className="mb-2">Forgot Password?</h3>
            <p className="small-muted">
              Enter your email address to get the password reset link
            </p>

            <form onSubmit={handleReset} className="mt-3">
              <div className="mb-3">
                <label className="form-label small-muted">Email</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email address"
                />
              </div>
              <button className="btn btn-primary w-100">Password Reset</button>
            </form>

            <div className="text-center mt-3">
              <small className="small-muted">
                Didn't receive an email? Check your spam folder.
              </small>
              <div className="mt-2">
                <Link to="/">Go back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
