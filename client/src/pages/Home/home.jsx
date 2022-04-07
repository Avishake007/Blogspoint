/**
 * @Page Home Page
 * @Desc  This page contains intro of blogspoint and all the posts in blogspoint
 */
//Third Party import
import React, { useEffect, useState } from "react";
//Local Imports
import AllPosts from "../../Components/AllPosts/allPosts";
import Intro from "../../Components/Intro/intro";
import Loader from "../../Components/Loader/loader";

const Home = () => {
  /**
   * @States_Definition
   */
  /**
   * @State_Name Loader
   * @Func It shows the loading Page until the page is fully loaded
   * @Type Boolean
   */
  const [loader, setLoader] = useState(true);
  /**
   * @State_Name Authenticate
   * @Func It checks whether the user is authenticated or not
   * @Type Boolean
   */
  const [authenticate, setAuthenticate] = useState(false);

  //Stores the user details in userData
  const userData = JSON.parse(localStorage.getItem("userLogin"));
  /**
   * @UseEffect_Definition
   */
  useEffect(() => {
    document.title = "Home Page - Blogspoint";
    //It calls toggles the state of authnticate from false to true and state of loader from true to false when user details is fetched
    if (userData) setAuthenticate(true);
    setLoader(false);
  }, []);
  //Shows loader Page when the page is loading
  if (loader) return <Loader />;

  return (
    <>
      {/* Intro of BLogspoint */}
      <Intro authenticate={authenticate} />
      {/* It displays all the posts of blogspoint */}
      <AllPosts authenticate={authenticate} />
    </>
  );
};
export default Home;
