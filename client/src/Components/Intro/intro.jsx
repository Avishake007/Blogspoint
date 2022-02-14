// Third party import
import React from "react";
import { Link } from "react-router-dom";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
//Local Imports
import Blogger from "../../assest/svgs/Blogger/blogger";

const Intro = ({authenticate}) => {
  const userData=JSON.parse(localStorage.getItem("userLogin"));
  const name=userData?.name||"Blogger"
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.part}`}>
        {/* About BLogspoint */}
        <div className={`${styles.first}`}>
          <p>Hey {name} ,</p>

          <p>
            Welcome to BlogsPoint - a place where you learn new things , share your knowledge to the world in the form of a blog. So 
            what are you waiting for  <span style={{color:"var(--font-color)",marginLeft:"10px",fontFamily:"cursive",fontWeight:"500"}}>START BLOGGING...</span>
          </p>
          {authenticate === false && (
            <div className={`${styles.signin_signup}`}>
              <Link className={` ${styles.signup}`} to="../signup">
                Register
              </Link>
              OR
              <Link className={`${styles.signin}`} to="../signin">
                Login
              </Link>
            </div>
          )}
          {authenticate === true && (
            <Link className={`${styles.get_started}`} to="../write">
              Get Started
            </Link>
          )}
        </div>
        {/* Blogger Image */}
        <div className={`${styles.second}`}>
          <Blogger />
        </div>
      </div>
    </div>
  );
};

export default Intro;
