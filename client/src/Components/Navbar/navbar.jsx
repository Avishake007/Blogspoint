/**
 * This is the Navbar Section of the website
 */
//Third Party imports
import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaMoon,FaUserAlt, FaWpforms } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import {GoSignIn, GoThreeBars} from "react-icons/go";
import {RiCloseFill, RiLogoutBoxFill, RiPagesFill} from "react-icons/ri";
import {AiFillHome} from "react-icons/ai";
//StyleSheets imports
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "./navbar.module.css";
import "../themes/dark.css";
import "../themes/light.css";
//Local imports
import { UserContext } from "../../App";

import Logo from "./logo.png";
const Navbar = () => {
  //UseContext Declarations
  const { state} = useContext(UserContext);
  const location=useLocation();
  const [isNight, setIsNight] = useState(JSON.parse(sessionStorage.getItem("night")));
  const flag= JSON.parse(localStorage.getItem("userLogin"));
  const [showNav,_showNav]=useState(false);
  const [showLinks,_showLinks]=useState(false);
  
  useEffect(()=>{
    sessionStorage.setItem("night",JSON.stringify(isNight));
    if(isNight)
    document.body.classList.add("darkmode");
    else
    document.body.classList.remove("darkmode");
  },[isNight])
  const toggleNav=()=>{
    if(!showNav)
    _showNav(true);
    else
    _showNav(false);
    if(!showLinks)
    _showLinks(true);
    else
    _showLinks(false);
  }
  const toggleTheme = () => {
   
    if (!isNight) setIsNight(true);
    else setIsNight(false);
  };
  const Toggle = () => {
    if (state || flag) {
      return (
        <>
         <a className="" href="/">
            <img src={Logo} className={`${styles.logo}`} alt="" />
          </a>
        
         <div
            className={`${styles.nav}`}
            style={{ justifyContent: "flex-end" }}
            id="navbarNavAltMarkup"
          >
            <ul className={`${styles.links}`}>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/'?`${styles.active}`:""}`}
                  id="home"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/about'?`${styles.active}`:""}`}
                  id="about"
                  to="../about"
                >
                  About
                </NavLink>
              </li>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/write'?`${styles.active}`:""}`}
                  id="write"
                  to="../write"
                >
                  Write
                </NavLink>
              </li>
              </ul>
          </div>
          <div
             className={`${styles.nav}`}
            style={{ justifyContent: "flex-end" }}
            id="navbarNavAltMarkup"
          >
            <ul className={`${styles.links}`}>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/logout'?`${styles.active}`:""}`}
                  id="logout"
                  to="../logout"
                >
                  Logout
                </NavLink>
              </li>
              </ul>
              </div>
              <div className={`${styles.small_device}`}>
               
                <GoThreeBars onClick={()=>toggleNav()}/>
                {
                  <div className={`${showNav?`${styles.active}`:`${styles.non_active}`}`}>
                <div className={`${styles.outer_container}`} onClick={()=>toggleNav()}></div>
                </div>
                }
                <div className={`${styles.nav_links} ${showLinks?`${styles.activeLinks}`:`${styles.non_activeLinks}`}`}>
                  <RiCloseFill onClick={()=>toggleNav()}/>
                <ul className={`${styles.links}`}>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/'?`${styles.activeLink}`:""}`}
                  id="home"
                  to="/"
                >
                  <AiFillHome/>
                  Home
                </NavLink>
              </li>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink}  ${location.pathname==='/about'?`${styles.activeLink}`:""}` }
                  id="about"
                  to="../about"
                >
                  <FaUserAlt/>
                  About
                </NavLink>
              </li>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/write'?`${styles.activeLink}`:""}`}
                  id="write"
                  to="../write"
                >
                  <RiPagesFill/>
                  Write
                </NavLink>
              </li>
              <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/logout'?`${styles.activeLink}`:""}`}
                  id="logout"
                  to="../logout"
                >
                  <RiLogoutBoxFill/>
                  Logout
                </NavLink>
              </li>
              </ul>
              
              </div>
              </div>
        </>
      );
    } else {
      return (
        <>
        <a className="" href="/">
           <img src={Logo} className={`${styles.logo}`} alt="" />
         </a>
       
        <div
           className={`${styles.nav}`}
           style={{ justifyContent: "flex-end" }}
           id="navbarNavAltMarkup"
         >
           <ul className={`${styles.links}`}>
             <li className={` ${styles.nav_item}`}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/'?`${styles.active}`:""}`}
                 id="home"
                 to="/"
               >
                 Home
               </NavLink>
             </li>
             <li className={` ${styles.nav_item}`}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/about'?`${styles.active}`:""}`}
                 id="about"
                 to="../about"
               >
                 About
               </NavLink>
             </li>
             <li className={` ${styles.nav_item}`}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/signin'?`${styles.active}`:""}`}
                 id="login"
                 to="../signin"
               >
                 LogIn
               </NavLink>
             </li>
             </ul>
         </div>
         <div
            className={`${styles.nav}`}
           style={{ justifyContent: "flex-end" }}
           id="navbarNavAltMarkup"
         >
           <ul className={`${styles.links}`}>
             <li className={` ${styles.nav_item} `}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/signup'?`${styles.active}`:""}`}
                 id="register"
                 to="../signup"
               >
                 SignUp
               </NavLink>
             </li>
             </ul>
             </div>
             <div className={`${styles.small_device}`}>
              
               <GoThreeBars onClick={()=>toggleNav()}/>
               {
                 <div className={`${showNav?`${styles.active}`:`${styles.non_active}`}`}>
               <div className={`${styles.outer_container}`} onClick={()=>toggleNav()}></div>
               </div>
               }
               <div className={`${styles.nav_links} ${showLinks?`${styles.activeLinks}`:`${styles.non_activeLinks}`}`}>
                 <RiCloseFill onClick={()=>toggleNav()}/>
               <ul className={`${styles.links}`}>
             <li className={` ${styles.nav_item}`}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/'?`${styles.activeLink}`:""}`}
                 id="home"
                 to="/"
               >
                 <AiFillHome/>
                 Home
               </NavLink>
             </li>
             <li className={` ${styles.nav_item}`}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/about'?`${styles.activeLink}`:""}`}
                 id="about"
                 to="../about"
               >
                 <FaUserAlt/>
                 About
               </NavLink>
             </li>
             <li className={` ${styles.nav_item}`}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/signin'?`${styles.activeLink}`:""}`}
                 id="login"
                 to="../signin"
               >
                 <GoSignIn/>
                 LogIn
               </NavLink>
             </li>
             <li className={` ${styles.nav_item}`}>
               <NavLink
                 className={`${styles.navlink} ${location.pathname==='/signup'?`${styles.activeLink}`:""} `}
                 id="register"
                 to="../signup"
               >
                 <FaWpforms/>
                 SignUp
               </NavLink>
             </li>
             </ul>
             
             </div>
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
            className={`${styles.navbar}`}
            style={{ zIndex: "4" }}
          >
            <Toggle />
            {/* <input type="checkbox" className={`${styles.toggle}`} name="toggle" id="toggle" onClick={() => toggleTheme()} /> */}
            <div className={`${styles.toggle}`} onClick={() => toggleTheme()}>
              {!isNight && <FaMoon style={{ color: "black" }} />}
              {isNight && <BsSun style={{ color: "yellow" }} />}
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};
export default Navbar;
