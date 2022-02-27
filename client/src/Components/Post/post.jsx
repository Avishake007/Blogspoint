//Third party import
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../methods/crud/user";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
//Local Imports
import Loader from "../Skeleton Loader/ShortPost/shortPost";
const Post = ({ post ,authenticate}) => {
  const [user,_user]=useState({});
  const [loader,_loader]=useState(true);
  useEffect(() => {
    const fetchData = async () => {
      let data = await getUserDetails(post?.userId);
      _user(data?.user);
      _loader(false);
    };
    fetchData();
    
  },[])
  if(loader)return <Loader/>
  return (
    <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={authenticate?`details/${post?._id}`:'/signin'}
        >
    <div className={`${styles.post}`}>
      <div className={styles.profilePic}>
      <img src={`http://localhost:5000/${user?.profilePic}`} alt="UserProfilePic" onError={({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src="http://localhost:5000/uploads/defaultpic.png";
  }}/>
      </div>
   
      <div className={styles.post.Details}>
      <div className={`${styles.upper}`}>
      
        {/* Username */}
        <div className={`${styles.username}`}>{post?.username}</div>
      </div>
      {/* Title */}
      <div className={`${styles.title}`}>{post?.title}</div>
      {/* Description */}
      <div className={`${styles.description}`}>
        {/* {post?.description.substring(0,50)}{post?.description.length>50&&"..."} */}
        Click here to know more 🙂
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Post;
