import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="car.svg"
              alt="Logo"
              className="d-inline-block align-text-top navbar-logo"
            />
            Vehicles
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse navbar-right"
            id="navbarText"
          >
            <span>
              <Link to="/add">
                <Button variant="secondary">Add new vehicle</Button>
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
