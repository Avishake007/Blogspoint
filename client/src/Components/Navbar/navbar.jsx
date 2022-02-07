/**
 * This is the Navbar Section of the website
 */
//Third Party imports
import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
//StyleSheets imports
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "./navbar.module.css";
import "../themes/darkmode.css";
//Local imports
import { UserContext } from "../../App";

import Logo from "./logo.png";
const Navbar = () => {
  //UseContext Declarations
  const { state, dispatch } = useContext(UserContext);

  const [isNight, setIsNight] = useState(false);
  const [flag, setFlag] = useState(false);
  const userAuthenticate = async () => {
    try {
      const res = await fetch("/user/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      console.log(data);
      setFlag(true);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    userAuthenticate();
  }, []);
  const toggleTheme = () => {
    document.body.classList.toggle("darkmode");
    if (!isNight) setIsNight(true);
    else setIsNight(false);
  };
  const Toggle = () => {
    if (state || flag) {
      return (
        <>
          <a className="navbar-brand" href="/">
            <img src={Logo} className={`${styles.logo}`} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className={`${styles.line}`}></div>
            <div className={`${styles.line}`}></div>
            <div className={`${styles.line}`}></div>
          </button>
          <div
            className="collapse navbar-collapse"
            style={{ justifyContent: "flex-end" }}
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item ${styles.nav_item} active`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="home"
                  to="/"
                >
                  Home<span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className={`nav-item ${styles.nav_item}`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="about"
                  to="../about"
                >
                  About
                </NavLink>
              </li>
              <li className={`nav-item ${styles.nav_item}`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="write"
                  to="../write"
                >
                  Write
                </NavLink>
              </li>
              <li className={`nav-item ${styles.nav_item}`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="logout"
                  to="../logout"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <a className="navbar-brand" href="/">
            <img src={Logo} className={`${styles.logo}`} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className={`${styles.line}`}></div>
            <div className={`${styles.line}`}></div>
            <div className={`${styles.line}`}></div>
          </button>
          <div
            className="collapse navbar-collapse"
            style={{ justifyContent: "flex-end" }}
            id="navbarNavAltMarkup"
          >
            <ul className="navbar-nav mr-auto">
              <li className={`nav-item active ${styles.nav_item} active`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="home"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className={`nav-item ${styles.nav_item}`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="about"
                  to="../about"
                >
                  About
                </NavLink>
              </li>
              <li className={`nav-item ${styles.nav_item}`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="login"
                  to="../signin"
                >
                  Login
                </NavLink>
              </li>
              <li className={`nav-item ${styles.nav_item}`}>
                <NavLink
                  className={`nav-link ${styles.navlink}`}
                  id="register"
                  to="../signup"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <div className={`${styles.container2}`}>
        <header>
          {/* <div className={`${styles.navbar}`}> */}
          <nav
            className={`navbar navbar-expand-lg navbar-primary ${styles.navbar}`}
            style={{ zIndex: "4" }}
          >
            <Toggle />
            {/* <input type="checkbox" className={`${styles.toggle}`} name="toggle" id="toggle" onClick={() => toggleTheme()} /> */}
            <div className={`${styles.toggle}`} onClick={() => toggleTheme()}>
              {!isNight && <FaMoon style={{ color: "#aa9c9f" }} />}
              {isNight && <BsSun style={{ color: "yellow" }} />}
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};
export default Navbar;
