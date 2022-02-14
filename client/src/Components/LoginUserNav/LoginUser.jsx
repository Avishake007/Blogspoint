import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { FaUserAlt} from "react-icons/fa";
import {RiCloseFill, RiLogoutBoxFill, RiPagesFill} from "react-icons/ri";
import {AiFillHome} from "react-icons/ai";
import styles from "../Navbar/navbar.module.css";
import Logo from "../Navbar/logo.png";
const LoginUser = ({location,userData}) => {
    const [showNav,_showNav]=useState(false);
    const [showLinks,_showLinks]=useState(false);
    const [showLogOutBtn,_showLogOutBtn]=useState(false);
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
      const toggleLogoutBtn=()=>{
          if(showLogOutBtn)
          _showLogOutBtn(false);
          else
          _showLogOutBtn(true)
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
            <ul className={`${styles.links}`} style={{display:"flex",flexDirection:"column"}}>
              {/* <li className={` ${styles.nav_item}`}>
                <NavLink
                  className={`${styles.navlink} ${location.pathname==='/logout'?`${styles.active}`:""}`}
                  id="logout"
                  to="../logout"
                >
                  Logout
                </NavLink>
              </li> */}
              <li className={` ${styles.nav_item}`}>
                <div
                  className={`${styles.userpic}`}
                  onClick={toggleLogoutBtn}
                >
                 {userData?.profilePic==="uploads/defaultpic.png"?userData?.name?.charAt(0):<img src={`http://localhost:5000/${userData.profilePic}`} alt="Your Profile Logo" style={{borderRadius:"50%"}}/>}
                </div>
              </li>
              {showLogOutBtn&&<li className={` ${styles.nav_item}`} >
                <NavLink
                  className={`${styles.logout}`}
                  id="logout"
                  to="../logout"
                >
                LogOut
                </NavLink>
              </li>}
              </ul>
              </div>
              <div className={`${styles.small_device}`}>
              
                <div
                  className={`${styles.userpic}`}
                  id="logout"
                  onClick={()=>toggleNav()}
                >
                 {userData?.profilePic==="uploads/defaultpic.png"?userData?.name?.charAt(0):<img src={`http://localhost:5000/${userData.profilePic}`} alt="Your Profile Logo" style={{borderRadius:"50%"}}/>}
                </div>
             
                {/* <GoThreeBars onClick={()=>toggleNav()}/> */}
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
  )
}

export default LoginUser