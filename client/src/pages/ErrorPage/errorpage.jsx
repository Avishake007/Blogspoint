/***
 * @Page Error page
 * @Desc This page will be shown when there is a 404
 */
//Third Part imports
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
//StyleSheets imports
import "./errorpage.css";
import "../../Components/themes/dark.css";
import "../../Components/themes/light.css";
//Local Imports
import ErrorImage from "./404Image";
const Errorpage = () => {
  /**
   * @UseEffect_Declaration
   */
  useEffect(() => {
    document.title = "404 Error Page - Blogspoint";
  }, []);
  return (
    <>
      <div className="errorpage" style={{ height: "100vh" }}>
        <ErrorImage/>
        <div className="error_page">
          <div className="page_not_found">
            <p>OOPS! You are lost</p>
            <i class="fa fa-frown"></i>
          </div>
          <button
            type="button"
            class="btn btn-light btn-outline-primary backbtn "
          >
            <NavLink className="nav-link" to="/">
              Back to Home
            </NavLink>
          </button>
        </div>
      </div>
    </>
  );
};
export default Errorpage;
