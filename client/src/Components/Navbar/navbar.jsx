import React, { useContext } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom';
import {UserContext} from "../../App";
import Logo from './logo.png';
const Navbar=()=>{
  const {state,dispatch}=useContext(UserContext);
  const home=()=>{
    document.getElementById("home").style.background="white";
    document.getElementById("home").style.color="black";

    document.getElementById("about").style.background="black";
    document.getElementById("about").style.color="white";
    
    document.getElementById("login").style.background="black";
    document.getElementById("login").style.color="white";

    document.getElementById("register").style.background="black";
    document.getElementById("register").style.color="white";
  }
  const about=()=>{
    document.getElementById("home").style.background="black";
    document.getElementById("home").style.color="white";

    document.getElementById("about").style.background="white";
    document.getElementById("about").style.color="black";

    document.getElementById("login").style.background="black";
    document.getElementById("login").style.color="white";

    document.getElementById("register").style.background="black";
    document.getElementById("register").style.color="white";
  }
  const login=()=>{
    document.getElementById("home").style.background="black";
    document.getElementById("home").style.color="white";

    document.getElementById("about").style.background="black";
    document.getElementById("about").style.color="white";
    
    document.getElementById("login").style.background="white";
    document.getElementById("login").style.color="black";

    document.getElementById("register").style.background="black";
    document.getElementById("register").style.color="white";
  }
  const register=()=>{
    document.getElementById("home").style.background="black";
    document.getElementById("home").style.color="white";

    document.getElementById("about").style.background="black";
    document.getElementById("about").style.color="white";

    document.getElementById("login").style.background="black";
    document.getElementById("login").style.color="white";

    document.getElementById("register").style.background="white";
    document.getElementById("register").style.color="black";
  }
  const Toggle=()=>{
    if(state){
      return(
        <>
        <img src={Logo} className={`${styles.logo}`} alt="" />
        <NavLink className={`navbar ${styles.nav_link}`} id="home" to="/">Home</NavLink>
        <NavLink className={`navbar ${styles.nav_link}`} id="about"  to="../about">About</NavLink>
      <NavLink className={`navbar ${styles.nav_link}`} id="logout"  to="../logout">Logout</NavLink>
      </>
      );
    }
    else{
      return(
        <>
        <img src={Logo} className={`${styles.logo}`} alt="" />
        <NavLink className={`navbar ${styles.nav_link}`} id="home" to="/">Home</NavLink>
        <NavLink className={`navbar ${styles.nav_link}`} id="about"  to="../about">About</NavLink>
        <NavLink className={`navbar ${styles.nav_link}`} id="write" to="../write">Write</NavLink>
      <NavLink className={`navbar ${styles.nav_link}`} id="login"  to="../signin">Login</NavLink>
      <NavLink className={`navbar ${styles.nav_link}`} id="register"  to="../signup">Register</NavLink>
      </>
      );
    }
  }
    return(
    <>
     <div className={`${styles.container2}`}>
        <header>
            <div className={`${styles.navbar}`}>
            
            
            
            <Toggle/>
            </div>
        </header>
        </div>
    </>
  );
}
export default Navbar;