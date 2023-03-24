import { Link } from "react-router-dom";
import { useState } from "react";

import Routes from "../../routes/Routes";
import Search from "./Search.module";

import "./Navigation.css";
import logo from "../../media/logo.svg";

export default function Navigation() {
  let [active, isActive] = useState(false);

  return (
    <div className="Navigation">
      <div className="info-module column">
        <div>{active && <Search />}</div>
        <Routes />
      </div>
      <div className="nav-module column">
        <div>
          <img src={logo} alt="PetsPaw Logo" />
          <h1>Hello</h1>
          <h3>Welcome to my Cat API App</h3>
        </div>

        <div>
          <Link to="/voting" onClick={() => isActive(true)}>
            Voting
          </Link>
          <Link to="/breeds" onClick={() => isActive(true)}>
            Breeds
          </Link>
          <Link to="/gallery" onClick={() => isActive(true)}>
            Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
