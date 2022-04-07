/**
 * @Page About Page
 * @Desc This Page contains all the details of the user
 */
//Third Part imports
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Button } from "antd";
import { RiEdit2Fill } from "react-icons/ri";
//StyleShhet import
import styles from "./about.module.css";

//Local Imports
import { getPostByUsername } from "../../methods/crud/post";
import YourPostModal from "../../Components/YourPostModal/YourPostModal";

import UpdateUserPic from "../../Components/UpdateUserPic/updateUserPic";
import Loader from "../../Components/Loader/loader";
import UpdateUserDetails from "../../Components/UpdateUserDetailsModal/UpdateUserDetails";
const About = () => {
  /***
   * @History_Declaration
   */
  const history = useHistory();
  const [userData, _userData] = useState(
    JSON.parse(localStorage.getItem("userLogin"))
  );
  /**
   * @State_Declarations
   */
  /**
   * @State_Name posts
   * @Func Stores all the posts of a user
   * @Type Array
   */
  const [posts, setPosts] = useState([]);
  /**
   * @State_Name open
   * @Func Shows/Hides the posts modal of a user
   * @Type Boolean
   */
  const [open, _open] = useState(false);
  /**
   * @State_Name openImg
   * @Func Shows/Hides the update user image modal of a user
   * @Type Boolean
   */
  const [openImg, _openImg] = useState(false);
  /**
   * @State_Name openUpdate
   * @Func Shows/Hides update user modal of a user
   * @Type Boolean
   */
  const [openUpdate, _openUpdate] = useState(false);
  /**
   * @State_Name loader
   * @Func Shows/hides the loader page
   * @Type Boolean
   */
  const [loader, _loader] = useState(true);
  /**
   * @Function_Name onOpenModal
   * @Desc Opens the post modal of a user by toggling open state from false to true
   * @Return_Type void
   */
  const onOpenModal = () => {
    _open((prev) => (prev = true));
  };
  /**
   * @Function_Name onCLoseModal
   * @Desc Closes the post modal of a  user by toggling open state from true to false
   * @Return_Type void
   */
  const onCLoseModal = () => {
    _open((prev) => (prev = false));
  };
  /**
   * @Function_Name onOpenModalImg
   * @Desc Opens the update user image modal by toggling openImg state from false to true
   * @Return_Type void
   */
  const onOpenModalImg = () => {
    _openImg((prev) => (prev = true));
  };
  /**
   * @Function_Name onCloseModalImg
   * @Desc Closes the update user image modal by toggling openImg state from true to false
   * @Return_Type void
   */
  const onCLoseModalImg = () => {
    _openImg((prev) => (prev = false));
  };
  /**
   * @Function_Name onOpenModalUpdate
   * @Desc Opens the update user details modal by toggling openUpdate state from false to true
   * @Return_Type void
   */
  const onOpenModalUpdate = () => {
    _openUpdate((prev) => (prev = true));
  };
  /**
   * @Function_Name onCLoseModalUpdate
   * @Desc Closes the update user details modal by toggling openUpdate state from true to false
   * @Return_Type void
   */
  const onCLoseModalUpdate = () => {
    _openUpdate((prev) => (prev = false));
  };
  /**
   * @Function_Name userAuthenticate
   * @Desc Checks for authentication and fetches the details of the authenticated user
   * @Return_Type void
   */
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

      if (res.status === 401) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      _userData(data);
      _loader(false);
    } catch (err) {
      if (err?.response?.status === 401) alert("Error : Unauthorised User");
      history.push("/signin");
    }
  };

  /**
   * @Function_Name fetchData
   * @Desc Fetches post by username and stores it in posts state
   * @Return_Type void
   */
  const fetchData = async (userID) => {
    let data = await getPostByUsername(userID); // params in url
    setPosts(data?.posts);
  };
  /**
   * @UseEffect_Declaration
   */
  useEffect(() => {
    document.title = "About Page - Blogspoint";
    fetchData(userData?._id);
  }, []);
  useEffect(() => {
    userAuthenticate();
  });

  //Push the user to signin page if not login
  if (userData === null) {
    history.push("/signin");
  }
  //Shows loader Page when the page is loading
  else if (loader) return <Loader />;
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container}`}>
        <p>ABOUT ME</p>
        {/* Section which gives the information of a user */}
        <div className={`${styles.about_section}`}>
          <div className={`${styles.user_pic}`}>
            {/* User Profile Pic */}
            <img
              src={`http://localhost:5000/${userData?.profilePic}`}
              alt="Your Profile Pic"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "http://localhost:5000/uploads/defaultpic.png";
              }}
            />
            {/*Edits user's profile pic */}
            <div
              className={`${styles.update}`}
              onClick={() => onOpenModalImg()}
            >
              Update Image
            </div>
          </div>
          <div className={`${styles.info}`}>
            {/* Username */}
            <div className={`${styles.detail}`}>
              <label htmlFor="Username">Username</label>
              <p>{userData?.username}</p>
            </div>
            {/* Name */}
            <div className={`${styles.detail}`}>
              <label htmlFor="name">Name : </label>
              <p>{userData?.name}</p>
            </div>
            {/* About me */}
            <div className={`${styles.detail}`}>
              <label htmlFor="about_me">About Me : </label>
              <p>Hello everyone</p>
            </div>
            {/* State */}
            <div className={`${styles.detail}`}>
              <label htmlFor="state">State : </label>
              <p>{userData?.state}</p>
            </div>
            {/* City */}
            <div className={`${styles.detail}`}>
              <label htmlFor="city">City : </label>
              <p>{userData?.city}</p>
            </div>
            {/* Designation */}
            <div className={`${styles.detail}`}>
              <label htmlFor="stuorprof">Student/Professional : </label>
              <p>{userData?.stuprof}</p>
            </div>
            {/* Number of Blogs */}
            <div className={`${styles.detail}`}>
              <label htmlFor="no_of_blogs">No of Blogs : </label>
              <p>{posts?.length}</p>
            </div>

            <div
              className={`${styles.detail}`}
              style={{ justifyContent: "space-evenly" }}
            >
              {/* Edit User Information */}
              <RiEdit2Fill
                style={{
                  fontSize: "40px",
                  cursor: "pointer",
                  fill: "var(--font-color)",
                }}
                onClick={onOpenModalUpdate}
              />
              {/* Shows all the user posts */}
              <Button
                className={`${styles.your_post_btn}`}
                onClick={onOpenModal}
              >
                Your Posts
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal responsible for showing all the posts of the signin user */}
      <YourPostModal open={open} onCLoseModal={onCLoseModal} posts={posts} />
      {/* Modal responsible for updating  user's profile image */}
      <UpdateUserPic
        open={openImg}
        onCLoseModal={onCLoseModalImg}
        user={userData}
      />
      {/* Modal responsible for updating user details  */}
      <UpdateUserDetails
        open={openUpdate}
        onCLoseModal={onCLoseModalUpdate}
        user={userData}
      />
    </>
  );
};
export default About;
