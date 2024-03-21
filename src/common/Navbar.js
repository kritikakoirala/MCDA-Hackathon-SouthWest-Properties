import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/Logo.png";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-sm shadow-sm bg-body rounded m-0 p-xs-2 p-sm-0 position-sticky top-0 start-0">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse " id="navbarTogglerDemo01">
          <Link className="navbar-brand" to={"/"}>
            <img className="img-fluid" src={logo} />
            {/* <h2>SW</h2>
            <p>Live.Shop.Work.Play</p> */}
          </Link>
          <ul class="navbar-nav ps-xs-0 ps-sm-5 mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/properties">
                Properties
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/model">
                Rent Forecast
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
