/**
 * @Page LogOut Page
 * @Desc User's log's out of the website via this page
 */
//Third Party Import
import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
//Local  Import
import { UserContext } from "../../App";
//StlyleSheet Import
import styles from "./logout.module.css";
const Logout = () => {
  /**
   * @UseContext_Declaration
   */
  const { dispatch } = useContext(UserContext);
  /**
   * @UseHistory_Declaration
   */
  const history = useHistory();
  //Stores user login details to userData
  const userData = JSON.parse(localStorage.getItem("userLogin"));
  /**
   * @UseEffect_Declaration
   * @Func It log's out the user from the website
   */

  useEffect(() => {
    fetch("/user/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        localStorage.setItem("userLogin", JSON.stringify(null));

        history.push("/signin", { replace: true });

        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  /**
   * @Func If the user is n't signedin to the website then push the user to the signin page
   */
  if (userData === null) {
    history.push("/signin");
  }
  return (
    <>
      <div className={`${styles.logout}`}>
        <p>Thanks for visiting our Website 😊</p>
        <p>Please 🙏 come back Again </p>
      </div>
    </>
  );
};
export default Logout;
