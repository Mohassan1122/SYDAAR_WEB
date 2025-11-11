import React from "react";

export default function Footer() {
  return (
    <footer
      className="py-3 text-center small-muted"
      style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
    >
      <div className="container">
        <span>
          &copy; {new Date().getFullYear()} SYDAAR — All rights reserved
        </span>
      </div>
    </footer>
  );
}
