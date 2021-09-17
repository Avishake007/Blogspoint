import React, { useContext ,useState,useEffect} from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './navbar.module.css';
import {NavLink} from 'react-router-dom';
import {UserContext} from "../../App";
// import {ImPencil} from 'react-icons/im';
import "../DarkMode/darkmode.css";

import Logo from './logo.png';
const Navbar=()=>{
  const {state,dispatch}=useContext(UserContext);
  console.log(dispatch)
  const [flag,setFlag]=useState(false);
const callAboutPage= async()=>{
      try{
          const res=await fetch('/about',{
          method:"GET",
          headers:{
              // Accept:"application/json",
              'Content-Type':'application/json'
          },
      });
      // console.log(res.json());
      if(!res.status===200)
      {
          const error=new Error(res.error);
          throw error;
      }
      const data=await res.json();
      console.log(data);
      setFlag(true);
    
  }
      catch(err){
         
          console.log(err);
          // history.push('/signin');
      }
  }
  useEffect(()=>{
    callAboutPage();
},[]);
const toggleTheme=()=>{
  document.body.classList.toggle("darkmode");
}
  const Toggle=()=>{
    if(state||flag){
      return(
        <>
         <a className="navbar-brand" href="/"><img src={Logo} className={`${styles.logo}`} alt="" /></a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  <div className={`${styles.line}`}></div>
   <div className={`${styles.line}`}></div>
   <div className={`${styles.line}`}></div>
  </button>
      <div className="collapse navbar-collapse" style={{justifyContent: "flex-end"}}id="navbarNavAltMarkup">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item ${styles.nav_item} active`} >
      <NavLink className={`nav-link ${styles.navlink}`} id="home" to="/">Home<span className="sr-only">(current)</span></NavLink>
      </li>
      <li className={`nav-item ${styles.nav_item}`}>
      <NavLink className={`nav-link ${styles.navlink}`} id="about"  to="../about">About</NavLink>
      </li>
      <li className={`nav-item ${styles.nav_item}`}>
      <NavLink className={`nav-link ${styles.navlink}`} id="write" to="../write">Write</NavLink>
      </li>
      <li className={`nav-item ${styles.nav_item}`}>
      <NavLink className={`nav-link ${styles.navlink}`} id="logout"  to="../logout">Logout</NavLink>
      </li>
    </ul>
   
  </div>  
        
        
      
      </>
      );
    }
    else{
      return(
        <>
       
  <a className="navbar-brand" href="/"><img src={Logo} className={`${styles.logo}`} alt="" /></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
   <div className={`${styles.line}`}></div>
   <div className={`${styles.line}`}></div>
   <div className={`${styles.line}`}></div>
  </button>
  <div className="collapse navbar-collapse" style={{justifyContent: "flex-end"}}id="navbarNavAltMarkup">
    <ul className="navbar-nav mr-auto">
      <li className={`nav-item active ${styles.nav_item} active`}>
      <NavLink className={`nav-link ${styles.navlink}`} id="home" to="/">Home</NavLink>
      </li>
      <li className={`nav-item ${styles.nav_item}`}>
      <NavLink className={`nav-link ${styles.navlink}`} id="about"  to="../about">About</NavLink>
      </li>
      <li className={`nav-item ${styles.nav_item}`}>
      <NavLink className={`nav-link ${styles.navlink}`} id="login"  to="../signin">Login</NavLink>
      </li>
      <li className={`nav-item ${styles.nav_item}`}>
    <NavLink  className={`nav-link ${styles.navlink}`} id="register"  to="../signup">Register</NavLink> 
      </li>
    </ul>
   
  </div>  
      </>
      );
    }
  }
    return(
    <>
     <div className={`${styles.container2}`}>
        <header>
            {/* <div className={`${styles.navbar}`}> */}
            <nav className={`navbar navbar-expand-lg navbar-primary ${styles.navbar}`} style={{zIndex: "4"}}>
            
            <Toggle/>
            <input type="checkbox"  className={`${styles.toggle}`} name="toggle" id="toggle" onClick={()=>toggleTheme()}/>
            </nav>
        </header>
        </div>
    </>
  );
}
export default Navbar;