/**
 * This is a Home Page
 * This page contains intro of blogspoint and all the posts of the current user 
 */
//Third Party import
import React, { useEffect, useState } from "react";
//Local Imports
import AllPosts from "../../Components/AllPosts/allPosts";
import Intro from "../../Components/Intro/intro";
import Loader from "../../Components/Loader/loader";

const Home = () => {
   /**
   * States Definition
   */

    const [loader, setLoader] = useState(true);

    const [authenticate, setAuthenticate] = useState(false);
  
    //Checking for user authentication
    const userData = JSON.parse(localStorage.getItem("userLogin"));
   
    useEffect(() => {
      document.title = "Home Page - Blogspoint";
      if(userData)
      setAuthenticate(true);
      setLoader(false);
    }, []);
    //Loader Functionality
    if (loader) return <Loader />;
 
  return (
    <>
      {/* Intro of BLogspoint */}
      <Intro authenticate={authenticate}/>
      {/* It displays all the posts of blogspoint */}
      <AllPosts authenticate={authenticate}/>
    </>
  );
};
export default Home;
