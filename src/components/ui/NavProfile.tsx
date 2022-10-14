import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const NavProfile: React.FC = () => {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  if (!currentUser) return <>Loading...</>;

  const toggleMenu = () => setOpen((prevState) => !prevState);

  return (
    <div role="button" className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="avatar"
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={`w-100 dropdown-menu${open ? " show" : ""}`}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
