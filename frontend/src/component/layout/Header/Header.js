import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { FaSearch } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GiCrossMark } from "react-icons/gi";
import Logo from "../../../images/E-MART.png";
function Header() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <div>
      <div
        className={click ? "main-container" : ""}
        onClick={() => {
          setClick(false);
        }}
      />
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img className="logo" src={Logo} alt="Logo" />
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/products"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/search"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <FaSearch />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/account"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <MdPerson />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/cart"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                <FaCartShopping />
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <GiCrossMark /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

// import React from "react";
// import { ReactNavbar } from "overlay-navbar";
// import logo from "../../../images/logo.png";

// const options = {
//   burgerColorHover: "#eb4034",
//   logo,
//   logoWidth: "20vmax",
//   navColor1: "white",
//   logoHoverSize: "10px",
//   logoHoverColor: "#eb4034",
//   link1Text: "Home",
//   link2Text: "Products",
//   link3Text: "Contact",
//   link4Text: "About",
//   link1Url: "/",
//   link2Url: "/products",
//   link3Url: "/contact",
//   link4Url: "/about",
//   link1Size: "1.3vmax",
//   link1Color: "rgba(35, 35, 35,0.8)",
//   nav1justifyContent: "flex-end",
//   nav2justifyContent: "flex-end",
//   nav3justifyContent: "flex-start",
//   nav4justifyContent: "flex-start",
//   link1ColorHover: "#eb4034",
//   link1Margin: "1vmax",
//   profileIconUrl: "/login",
//   profileIconColor: "black",
//   searchIconColor: "black",
//   cartIconColor: "black",
//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
// };

// const Header = () => {
//   return <ReactNavbar {...options} />;
// };

// export default Header;
