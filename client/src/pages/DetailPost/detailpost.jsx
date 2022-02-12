//Third Party imports
import React, { useEffect} from "react";
import { ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom"
//StyleSheets import
import "react-toastify/dist/ReactToastify.css";
import styles from "./detailView.module.css";
//Local import
import SinglePost from "../../Components/SinglePost/singlepost";
import SingleComment from "../../Components/SingleComment/singlecomment";
;
const DetailView = ({ match }) => {
  //UseHistory Declaration
  const history = useHistory();
  //Checking for user authentication
  const userData = JSON.parse(localStorage.getItem("userLogin"));
  //UseEffect Declarations
  useEffect(() => {
    document.title = "Your Post - Blogspoint";
   
  }, []);
  //Push the user to SignIn Page when user is not login
  if(userData==null)history.push("/signin")
  return (
    <>
      <ToastContainer />
      <div className={`${styles.container}`}>
        <SinglePost flaged={true} user={userData} match={match}/>
        <SingleComment match={match} userData={userData} />
      </div>
    </>
  );
};
export default DetailView;
