import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Navbar({ setSearchTerm }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Hata", error);
      });
  };

  return (
    <nav>
      <div className="navbar-title">
        <NavLink className="title" to="/">
          Gutenberg
        </NavLink>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/"
          >
            Ana Sayfa
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            to="/kitaplığım"
          >
            Kitaplığım
          </NavLink>
        </li>
      </ul>
      <div className="nav-logout">
        <NavLink className="profile">
          <button onClick={handleLogout} className="logout-btn">
            Çıkış Yap
          </button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;