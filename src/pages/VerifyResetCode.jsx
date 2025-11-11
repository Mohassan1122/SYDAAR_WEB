import React, { useEffect, useState } from "react";
import { getReset } from "../utils/fakeAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyResetCode() {
  const [codeInputs, setCodeInputs] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    const reset = getReset();
    if (!reset) {
      toast.error("No reset request found. Start over.");
      nav("/forgot-password");
      return;
    }
    // expiration: 15 minutes
    const expiry = reset.createdAt + 15 * 60 * 1000;
    const tick = () => {
      const remaining = Math.max(0, expiry - Date.now());
      setCountdown(Math.ceil(remaining / 1000));
      if (remaining <= 0) {
        // expired
        clearInterval(interval);
      }
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nav]);

  const handleChange = (idx, val) => {
    if (/^\d?$/.test(val)) {
      const arr = [...codeInputs];
      arr[idx] = val;
      setCodeInputs(arr);
      // auto-focus next
      if (val && idx < 5) {
        const next = document.getElementById(`pin-${idx + 1}`);
        if (next) next.focus();
      }
    }
  };

  const submitCode = (e) => {
    e.preventDefault();
    const typed = codeInputs.join("");
    const reset = getReset();
    if (!reset) {
      toast.error("No reset request found");
      return;
    }
    if (Date.now() > reset.createdAt + 15 * 60 * 1000) {
      toast.error("Reset code expired. Please request again.");
      return;
    }
    if (typed !== reset.code) {
      toast.error("Invalid code");
      return;
    }
    toast.success("Code verified");
    // store a simple flag to allow reset form to proceed
    localStorage.setItem(
      "sydaar_reset_verified",
      JSON.stringify({ email: reset.email, ok: true })
    );
    nav("/reset-password");
  };

  return (
    <div className="container auth-wrapper">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card card-auth p-4 text-center">
            <h4>Enter Your Verification Code</h4>
            <p className="small-muted">
              We sent a code to your email. Enter it below to verify your
              account within 15 minutes.
            </p>

            <form
              onSubmit={submitCode}
              className="d-flex justify-content-center align-items-center mt-3"
            >
              {codeInputs.map((v, i) => (
                <input
                  key={i}
                  id={`pin-${i}`}
                  value={v}
                  onChange={(e) => handleChange(i, e.target.value)}
                  maxLength={1}
                  className="pin-input"
                />
              ))}
            </form>

            <div className="mt-3 small-muted">
              {countdown > 0 ? (
                <div>
                  Code expires in: {Math.floor(countdown / 60)}:
                  {String(countdown % 60).padStart(2, "0")}
                </div>
              ) : (
                <div className="text-danger">Code expired</div>
              )}
            </div>

            <button className="btn btn-primary mt-3" onClick={submitCode}>
              Verify Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
