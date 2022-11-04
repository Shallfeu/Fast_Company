import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { getLogged } from "../../store/usersSlice/selectors";
import NavProfile from "./NavProfile";

const NavBar: React.FC = () => {
  const logged = useAppSelector(getLogged);

  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <Link className="nav-link" to="/">
            Menu
          </Link>

          {logged && (
            <Link className="nav-link" to="/users">
              Users
            </Link>
          )}
        </ul>

        <div className="d-flex">
          {logged ? (
            <NavProfile />
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
