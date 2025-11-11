import React, { useState, useEffect } from "react";
import { updateUserPassword, getReset, clearReset } from "../utils/fakeAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const verified = JSON.parse(
      localStorage.getItem("sydaar_reset_verified") || "null"
    );
    const reset = getReset();
    if (!verified || !verified.ok || !reset || verified.email !== reset.email) {
      toast.error("No verified reset request. Start over.");
      nav("/forgot-password");
    }
  }, [nav]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !repassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== repassword) {
      toast.error("Passwords do not match");
      return;
    }

    const verified = JSON.parse(localStorage.getItem("sydaar_reset_verified"));
    const ok = updateUserPassword(verified.email, password);
    if (ok) {
      toast.success("Password updated successfully");
      // cleanup
      clearReset();
      localStorage.removeItem("sydaar_reset_verified");
      nav("/");
    } else {
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="container auth-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          <div className="card card-auth p-4">
            <h3>Reset Password</h3>
            <p className="small-muted">Enter your new password below</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small-muted">
                  Enter new password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="mb-3">
                <label className="form-label small-muted">
                  Re-enter new password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

              <button className="btn btn-primary w-100">Password Reset</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
