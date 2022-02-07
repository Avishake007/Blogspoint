// Third party import
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
//Local Imports
import Blogger from "../../assest/svgs/Blogger/blogger";
import Loader from "../Loader/loader";
const Intro = () => {
  /**
   * States Definition
   */

  const [loader, setLoader] = useState(true);

  const [authenticate, setAuthenticate] = useState(false);

  //Checking for user authentication
  const userAuthenticate = async () => {
    try {
      const res = await fetch("/user/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.status === 200) {
        setAuthenticate(false);
        const error = new Error(res.error);

        throw error;
      }
      const data = await res.json();

      setAuthenticate(true);
    } catch (err) {
      console.log(err);
      setAuthenticate(false);
    }
    setLoader(false);
  };

  //UseEffect definition
  useEffect(() => {
    userAuthenticate();
  }, []);
  //Loader Functionality
  if (loader) return <Loader />;
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.part}`}>
        {/* About BLogspoint */}
        <div className={`${styles.first}`}>
          <p>Lorem ipsum dolor sit</p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            velit iure quibusdam iste mollitia. Aliquam quisquam, pariatur sint
            nulla assumenda labore!
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
