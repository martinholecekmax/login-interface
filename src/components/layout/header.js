import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthManagerContext } from "../../context/authManager";

import styles from "./header.module.css";

const Header = () => {
  const { authenticated, logout } = useContext(AuthManagerContext);

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>

        {authenticated ? (
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item">
              <div className={`${styles.logout} nav-link`} onClick={logout}>
                Logout
              </div>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
