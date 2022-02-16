//Third party import
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetails } from "../../methods/crud/user";
//Importing Stylesheets
import styles from "../../pages/Home/home.module.css";
const Post = ({ post ,authenticate}) => {
  const [user,_user]=useState({});
  useEffect(() => {
    const fetchData = async () => {
      let data = await getUserDetails(post.userId);
      _user(data);
    };
    fetchData();
    
  },[])
  return (
    <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={authenticate?`details/${post?._id}`:'/signin'}
        >
    <div className={`${styles.post}`}>
      <div className={styles.profilePic}>
      <img src={`http://localhost:5000/${user?.profilePic}`} alt="UserProfilePic" />
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
