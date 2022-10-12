import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavBar: React.FC = () => {
  const { currentUser } = useAuth();

  console.log(currentUser, "nav");

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <Link className="nav-link" to="/">
            Menu
          </Link>

          {currentUser && (
            <Link className="nav-link" to="/users">
              Users
            </Link>
          )}
        </ul>

        <div className="d-flex">
          {currentUser ? (
            <p>User</p>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
