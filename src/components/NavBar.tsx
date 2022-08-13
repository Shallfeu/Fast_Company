import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <ul className="nav">
      <Link className="nav-link" to="/">
        Menu
      </Link>

      <Link className="nav-link" to="/login">
        Login
      </Link>

      <Link className="nav-link" to="/users">
        Users
      </Link>
    </ul>
  );
};

export default NavBar;
