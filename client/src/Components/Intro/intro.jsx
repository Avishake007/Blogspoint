// Third party import
import React from "react";
import { Link } from "react-router-dom";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
//Local Imports
import Blogger from "../../assest/svgs/Blogger/blogger";

const Intro = ({authenticate}) => {
 
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.part}`}>
        {/* About BLogspoint */}
        <div className={`${styles.first}`}>
          <p>Hey Blogger ,</p>

          <p>
            Welcome to BlogsPoint - a place where you learn new things , share your knowledge to the world in the form of a blog. So 
            what are you waiting for START BLOGGING...
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
