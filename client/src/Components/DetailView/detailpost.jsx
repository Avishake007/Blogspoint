import React, { useEffect, useState } from 'react';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Loader section
import Loader from '../Loader/loader';

//Get post and delete post function
import { getPost, deletePost } from '../crud/crud';

//Importing react icons
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';

import {Link,useHistory} from 'react-router-dom';

//Importing css of detailpost
import styles from './detailView.module.css';
const DetailView=({match})=>{
    const history= useHistory();

    //Defining useState  constanta
    const [post, setPost] = useState({});
    const [userData,setUserData]=useState({});
    const [flag,setFlag]=useState(false);
    const [loader,setLoader]=useState(true);

    //Checking for user authentication
    const userAuthenticate= async()=>{
      try{
          const res=await fetch('/about',{
          method:"GET",
          headers:{
              // Accept:"application/json",
              'Content-Type':'application/json'
          },
      });
      // console.log(res.json());
      if(!res.status===200)
      {
          const error=new Error(res.error);
          throw error;
      }
      const data=await res.json();
      console.log(data);
      setUserData(data);
      setFlag(true);
    
  }
      catch(err){
         
          console.log(err);
          // history.push('/signin');
      }
  }


  useEffect(()=>{
    userAuthenticate();
},[]);
    useEffect(() => {
        
        const fetchData = async () => {
            let data = await getPost(match.params.id);
            setPost(data);
            setLoader(false);
        }
        fetchData();
    }, []);
    console.log(post);

    //Deleting a post
    const deleteBlog = async () => {    
        await deletePost(post._id);
        setTimeout(toast.error("Post Deleted",{
            position: "top-center",
          }),3000);
        history.push('/')
    }


    if(loader)
    return <Loader/>
    return(
        <>
        <ToastContainer/>
        <div className={`${styles.container}`}>
            <div className={`${styles.first_inner_container}`}>

                <p>
                    <label htmlFor="username">Username : </label>
                    {post.username}
                    </p>
                <p>
                    <label htmlFor="Created_date">Created Date : </label>
                    {new Date(post.createdDate).toDateString()}
                    </p>
            </div>
            <div className={`${styles.second_inner_container}`}>
                <div className={`${styles.title}`}>
                <label htmlFor="title">Title : </label>
                <p>{post.title}</p>
                </div>
                {
                (flag==true)&&(userData.username===post.username)&&<div className={`${styles.edit_update}`}>
                    <Link to={`/update/${post._id}`}><AiFillEdit/></Link>
                    
                    <MdDelete onClick={()=>deleteBlog()}/>
               </div>
                }
            </div>
           
            <div className={`${styles.third_inner_container}`}>
                <p>{post.description}</p>
            </div>
        </div>
        </>
    )
}
export default DetailView;