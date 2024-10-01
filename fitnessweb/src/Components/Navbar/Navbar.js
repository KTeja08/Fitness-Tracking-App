import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import NotificationsIcon from '@mui/icons-material/Notifications';

function NavBar({ user }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleNotificationClick = () => {
    alert("Notifications clicked!"); // Example action
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img 
              src="https://t4.ftcdn.net/jpg/04/55/28/91/360_F_455289151_K3eZziBHP0QPGedXjR3Am3y0HWwv9NII.jpg"
              alt="fitness"
              className="logo-image"
            />
            <span className="logo-text">FitNessTrack</span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink exact to="/" activeClassName="active" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/about" activeClassName="active" className="nav-links" onClick={handleClick}>
                About
              </NavLink>
            </li>
            {/* Always show Login and Register */}
            <li className="nav-item">
              <NavLink exact to="/login" activeClassName="active" className="nav-links" onClick={handleClick}>
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/register" activeClassName="active" className="nav-links" onClick={handleClick}>
                Register
              </NavLink>
            </li>
            {/* Show Users link only when user is logged in */}
            {user && (
              <li className="nav-item">
                <NavLink exact to="/users" activeClassName="active" className="nav-links" onClick={handleClick}>
                  Users
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav-icon" onClick={handleNotificationClick}>
            <NotificationsIcon />
          </div>

          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
