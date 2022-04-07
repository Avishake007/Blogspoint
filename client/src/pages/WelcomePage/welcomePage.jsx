/**
 * @Page Welcome Page
 * @Desc Welcome Page shown to signed user
 */
//Third party imports
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//Local imports
import styles from "./welcomePage.module.css";
const WelcomePage = () => {
  /**
   * @UseHistory_Declaration
   */
  const history = useHistory();
  /**
   * @State_Name userData
   * @Func Stores the details of the user
   * @Type Object
   */
  const [userData, _userData] = useState(null);
  /**
   * @UseEffect_Declaration
   */
  useEffect(async () => {
    document.title = "Welcome To BlogsPoint 😀";
    _userData(await JSON.parse(localStorage.getItem("userLogin")));
  }, []);
  //If the user is not signed in then push the user to home page
  if (userData != null) history.push("/");
  return (
    <div className={`${styles.welcome_page}`}>
      <p>Welcome To BlogsPoint</p>
      <Link to="/">Let's Explore</Link>
    </div>
  );
};

export default WelcomePage;
