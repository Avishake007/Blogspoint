import React, { useState } from 'react';
import { NavLink} from "react-router-dom";
import { FaUserAlt, FaWpforms } from "react-icons/fa";
import {GoSignIn, GoThreeBars} from "react-icons/go";
import {RiCloseFill} from "react-icons/ri";
import {AiFillHome} from "react-icons/ai";
import styles from "../Navbar/navbar.module.css";
import Logo from "../Navbar/logo.png";
const NonLogin = ({location}) => {
    const [showNav,_showNav]=useState(false);
    const [showLinks,_showLinks]=useState(false);
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
  )
}

export default NonLogin