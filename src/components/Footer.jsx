import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
    <div className="card">
        <div className="card-header">Featured</div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <Link href="/" className="btn btn-primary">
            Go somewhere
          </Link>
        </div>
      </div>
    </>
  );
}
