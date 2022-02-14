import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styles from "./welcomePage.module.css";
const WelcomePage = () => {
    const history=useHistory();
    const [userData,_userData] =useState(null)
    useEffect(async ()=>{
        document.title="Welcome To BlogsPoint 😀";
         _userData(await JSON.parse(localStorage.getItem("userLogin")));
},[])
    if(userData!=null)history.push("/");
  return (
    <div className={`${styles.welcome_page}`}>
                <p>Welcome To BlogsPoint</p>
               <Link to="/">
                Let's Explore
               </Link>
            </div>
  )
}

export default WelcomePage