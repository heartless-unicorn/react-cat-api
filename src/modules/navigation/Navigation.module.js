import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import Routes from "../../routes/Routes";
import Search from "./Search.module";

import "./Navigation.css";
import logo from "../../media/logo.svg";

export default function Navigation() {
  let location = useLocation();

  return (
    <div className="Navigation">
      <div className="info-module column">
        <div>{location.pathname !== "/" && <Search />}</div>
        <Routes />
      </div>
      <div className="nav-module column">
        <div>
          <img src={logo} alt="PetsPaw Logo" />
          <h1>Hello</h1>
          <h3>Welcome to my Cat API App</h3>
        </div>

        <div>
          <Link to="/voting">Voting</Link>
          <Link to="/breeds">Breeds</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
      </div>
    </div>
  );
}
