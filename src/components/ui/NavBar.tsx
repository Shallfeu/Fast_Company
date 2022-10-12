import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavBar: React.FC = () => {
  const { currentUser } = useAuth();

  console.log(currentUser, "nav");
  //Постоянный null
  // Я думал, что все компоненты связаны и если один одновился, зависимые от него также одновляются
  // но этого не происходит. (пишу про currentUser от которого зависим NavBar, а обновляется переменная в useAuth)

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
