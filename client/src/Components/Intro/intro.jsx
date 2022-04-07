/**
 * @Component_Name Intro
 * @Desc Its shows the intro of blogspoint
 */
// Third party import
import React from "react";
import { Link } from "react-router-dom";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
//Local Imports
import Blogger from "../../assest/svgs/Blogger/blogger";

const Intro = ({ authenticate }) => {
  //Stores the user details in userData
  const userData = JSON.parse(localStorage.getItem("userLogin"));
  //Stores the username in name field
  const name = userData?.name?.split(" ")[0] || "Blogger";
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.part}`}>
        {/* About BLogspoint */}
        <div className={`${styles.first}`}>
          <p>Hey {name} ,</p>

          <p>
            Welcome to BlogsPoint - a place where you learn new things , share
            your knowledge to the world in the form of a blog. So what are you
            waiting for{" "}
            <span
              style={{
                color: "var(--font-color)",
                marginLeft: "10px",
                fontFamily: "cursive",
                fontWeight: "500",
              }}
            >
              START BLOGGING...
            </span>
          </p>
          {/* Shows Register and login button for nonauthenticated user */}
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
          {/* Shows get started button for authenticate user*/}
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
