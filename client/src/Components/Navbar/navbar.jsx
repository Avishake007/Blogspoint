/**
 * This is the Navbar Section of the website
 */
//Third Party imports
import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaMoon} from "react-icons/fa";
import { BsSun } from "react-icons/bs";

//StyleSheets imports
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import styles from "./navbar.module.css";
import "../themes/dark.css";
import "../themes/light.css";
//Local imports
import { UserContext } from "../../App";

import LoginUser from "../LoginUserNav/LoginUser";
import NonLogin from "../NonLoginUserNav/NonLogin";
const Navbar = () => {
  //UseContext Declarations
  const { state} = useContext(UserContext);
  const location=useLocation();
  const [userData, setUserData] = useState({});
  const [isNight, setIsNight] = useState(JSON.parse(sessionStorage.getItem("night")));
  const user= JSON.parse(localStorage.getItem("userLogin"));
  const [flag,_flag]=useState(false);
  const [flag2,_flag2]=useState(false);
  
  //Checking for user authentication
  const userAuthenticate = async () => {
    try {
      const res = await fetch("/user/authenticate", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.status === 401) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      setUserData(data);
      _flag(true);
    
    } catch (err) {
    _flag(false);
      if(err?.response?.status===401)
      alert("Error : Unauthorised User");
     
    }
    _flag2(true);
  };
  useEffect(()=>{
    userAuthenticate()
    
  },[location])
  if(flag2){
  if(flag){
    localStorage.setItem("userLogin",JSON.stringify(userData));
  }
  else{
    localStorage.setItem("userLogin",JSON.stringify(null));
  }
}
  useEffect(()=>{
    sessionStorage.setItem("night",JSON.stringify(isNight));
    if(isNight)
    document.body.classList.add("darkmode");
    else
    document.body.classList.remove("darkmode");
  },[isNight])
  
  const toggleTheme = () => {
   
    if (!isNight) setIsNight(true);
    else setIsNight(false);
  };
  const Toggle = () => {
    if (state || user) {
      return (
        <LoginUser location={location} userData={userData}/>
      );
    } else {
      return (
        <NonLogin location={location}/>
      );
    }
  };
  return (
    <>
      <div className={`${styles.container2}`}>
        <header>
         
          <nav
            className={`${styles.navbar}`}
            style={{ zIndex: "4" }}
          >
            <Toggle />
           
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
