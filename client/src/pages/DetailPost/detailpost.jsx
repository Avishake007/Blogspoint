//Third Party imports
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
//StyleSheets import
import "react-toastify/dist/ReactToastify.css";
import SinglePost from "../../Components/SinglePost/singlepost";
import styles from "./detailView.module.css";
//Local import
import Loader from "../../Components/Skeleton Loader/Posts/post";
import SingleComment from "../../Components/SingleComment/singlecomment";
const DetailView = ({ match }) => {
  //UseState Declarations
  const [userData, setUserData] = useState({});
  const [flag, setFlag] = useState(true);
  const [loader, setLoader] = useState(true);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  //Checking for user authentication
  const userAuthenticate = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      setUserData(data);
      setFlag(true);
      setLoader(false);
    } catch (err) {
      console.log(err);
    }
  };

  //UseEffect Declarations
  useEffect(() => {
    document.title = "Your Post - Blogspoint";
    userAuthenticate();
  }, []);
  //Loader Functionality
  if (loader) return <Loader />;
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container}`}>
        <SinglePost flaged={flag} user={userData} match={match}/>
        <SingleComment match={match} userData={userData} />
      </div>
    </>
  );
};
export default DetailView;
