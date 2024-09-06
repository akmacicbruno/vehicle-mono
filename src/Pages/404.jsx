import "../App.css";
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="App">
      <div className="notfound-container">
        <img src="404.svg" alt="not_found" width="450" height="450" />
        <h1 className="notfound-title">Page not found</h1>
        <p className="notfound-text">Accident occurred.</p>
        <Link to="/" className="back-home-link">
          <p>Go to safety</p>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
