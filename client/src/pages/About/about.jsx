/*
    This is About Page
    This Page contains all the details of the user
*/
//Third Part imports
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//StyleShhet import
import styles from "./about.module.css";
//Local Imports
import defaultpic from "../../assest/images/defaultpic.png";
import { getPostByUsername } from "../../methods/crud/post";
import Loader from "../../Components/Loader/loader";

const About = () => {
  //UseState Declarations
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);
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

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();

      fetchData(data._id);

      setUserData(data);
      setLoader(false);
    } catch (err) {
      //If user not authenticate then redirect to signin page
      console.log(err);
      history.push("/signin");
    }
  };
  //Get all the posts of the login user
  const fetchData = async (userID) => {
    let data = await getPostByUsername(userID); // params in url
    setPosts(data);
  };
  //UseEffect Declarations
  useEffect(() => {
    document.title = "About Page - Blogspoint";
    userAuthenticate();
  }, []);
    //Loader Functionality
  if (loader) return <Loader />;
  return (
    <>
      <div className={`${styles.container}`}>
        <p>ABOUT ME</p>
        {/* Section which gives the information of a user */}
        <div className={`${styles.about_section}`}>
          <div className={`${styles.user_pic}`}>
            <img src={defaultpic} alt="" />
          </div>
          <div className={`${styles.info}`}>
            <div className={`${styles.detail}`}>
              <label htmlFor="Username">Username</label>
              <p>{userData.username}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="name">Name : </label>
              <p>{userData.name}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="about_me">About Me : </label>
              <p>Hello everyone</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="state">State : </label>
              <p>{userData.state}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="city">City : </label>
              <p>{userData.city}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="stuorprof">Student/Professional : </label>
              <p>{userData.stuprof}</p>
            </div>

            <div className={`${styles.detail}`}>
              <label htmlFor="no_of_blogs">No of Blogs : </label>
              <p>{posts.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
