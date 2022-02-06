/**
 * This is a Home Page
 * This page contains intro of blogspoint and all the posts of the current user 
 */
//Third Party import
import React, { useEffect } from "react";
//Local Imports
import AllPosts from "../../Components/AllPosts/allPosts";
import Intro from "../../Components/Intro/intro";

const Home = () => {
  useEffect(() => {
    document.title = "Home Page - Blogspoint";
  }, []);
  return (
    <>
      {/* Intro of BLogspoint */}
      <Intro />
      {/* It displays all the posts of blogspoint */}
      <AllPosts />
    </>
  );
};
export default Home;
