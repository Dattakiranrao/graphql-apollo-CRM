import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle size="5em" />
      <h1>404</h1>
      <p className="lead"> Sorry, This Page Does Not exist</p>
      <Link to="/" className="btn btn-primary">
        Home
      </Link>
    </div>
  );
}
