/*
    This is About Page
    This Page contains all the details of the user
*/
//Third Part imports
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//StyleShhet import
import styles from "./about.module.css";

//Local Imports
// import defaultpic from "../../assest/images/defaultpic.png";
import { getPostByUsername } from "../../methods/crud/post";
import YourPostModal from "../../Components/YourPostModal/YourPostModal";
import { Button } from "antd";
import { updateUserInfo } from "../../methods/crud/user";
import UpdateUserPic from "../../Components/UpdateUserPic/updateUserPic";
import Loader from  "../../Components/Loader/loader";
const About = () => {
  //UseState Declarations
  const history = useHistory();
  const [userData,_userData] = useState(JSON.parse(localStorage.getItem("userLogin")));
  const [posts, setPosts] = useState([]);
  const [open, _open] =useState(false);
  const [openImg,_openImg]=useState(false);
  const[loader,_loader]=useState(true);
  const onOpenModalImg=()=>{
    _openImg((prev)=>(prev=true))
  }
  const onCLoseModalImg=()=>{
    _openImg((prev)=>(prev=false));
  }
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

      if (res.status === 401) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      _userData(data);
      _loader(false);
    
    } catch (err) {
  
      if(err?.response?.status===401)
      alert("Error : Unauthorised User");
     
    }
 
  };
  useEffect(()=>{
    userAuthenticate()
    
  })
  
  //Get all the posts of the login user
  const fetchData = async (userID) => {
    let data = await getPostByUsername(userID); // params in url
    setPosts(data);
  };
  const onOpenModal=()=>{
    _open((prev)=>(prev=true))
  }
  const onCLoseModal=()=>{
    _open((prev)=>(prev=false));
  }
  //UseEffect Declarations
  useEffect(() => {
    document.title = "About Page - Blogspoint";
    fetchData(userData?._id)
  }, []);
    //Push the user to signin page if not login
  if (userData==null) {history.push("/signin")}
  else if(loader)return <Loader/>
  return (
    <>
    <ToastContainer/>
      <div className={`${styles.container}`}>
        <p>ABOUT ME</p>
        {/* Section which gives the information of a user */}
        <div className={`${styles.about_section}`}>
          <div className={`${styles.user_pic}`}>
            <img src={`http://localhost:5000/${userData.profilePic}`} alt="Your Profile Pic" />
            <div className={`${styles.update}`} onClick={()=>onOpenModalImg()}>Update Image</div>
           
          </div>
          <div className={`${styles.info}`}>
            <div className={`${styles.detail}`}>
              <label htmlFor="Username">Username</label>
              <p>{userData?.username}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="name">Name : </label>
              <p>{userData?.name}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="about_me">About Me : </label>
              <p>Hello everyone</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="state">State : </label>
              <p>{userData?.state}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="city">City : </label>
              <p>{userData?.city}</p>
            </div>
            <div className={`${styles.detail}`}>
              <label htmlFor="stuorprof">Student/Professional : </label>
              <p>{userData?.stuprof}</p>
            </div>

            <div className={`${styles.detail}`}>
              <label htmlFor="no_of_blogs">No of Blogs : </label>
              <p>{posts?.length}</p>
            </div>
            <div className={`${styles.detail}`} style={{justifyContent:"center"}}>
              <Button className={`${styles.your_post_btn}`} onClick={onOpenModal}>Your Posts</Button>
              
            </div>
          </div>
        </div>
      </div>
      <YourPostModal open={open} onCLoseModal={onCLoseModal} posts={posts}/>
      <UpdateUserPic open={openImg} onCLoseModal={onCLoseModalImg} user={userData}/>
    </>
  );
};
export default About;
