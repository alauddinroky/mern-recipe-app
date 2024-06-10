import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss"; // Import your SCSS file for styling

//importing react icons
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => (prev ? false : true));
  };

  return (
    <nav className="navbar">
      <div className="logo">My Restaurant</div>
      <div className="menu-icon" onClick={toggleMenu}>
        {/* &#9776; */}
        {open ? <IoMdClose /> : <RxHamburgerMenu />}
      </div>
      <div className={`nav-links ${open ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink to="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-item" onClick={toggleMenu}>
              Add Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" onClick={toggleMenu}>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us" onClick={toggleMenu}>
              About Us
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
