import React, { useEffect, useState } from 'react';



import swal from "sweetalert";
//Loader section
import Loader from '../Skeleton Loader/Posts/post';
//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Get post and delete post function
import { getPost, deletePost, updatePost, updateUserInfo } from '../crud/crud';

//Importing react icons
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import {AiOutlineLike,AiOutlineDislike,AiFillLike,AiFillDislike} from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';

//Importing css of detailpost
import styles from './detailView.module.css';
const DetailView = ({ match }) => {
    const history = useHistory();

    //Defining useState  constanta
    const [post, setPost] = useState({ "username": '', "title": '', "description": '',
"noOfLikes":0,"noOfDislikes":0 });
    const [userData, setUserData] = useState({});
    const [flag, setFlag] = useState(false);
    const [loader, setLoader] = useState(true);
    const [like,setLike]=useState(false);
    const [dislike,setDislike]=useState(false);
    //Checking for user authentication
    const userAuthenticate = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    // Accept:"application/json",
                    'Content-Type': 'application/json'
                },
            });
            // console.log(res.json());
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            const data = await res.json();
            console.log(data);
            if(data.postLikes.includes(match.params.id))
            setLike(true)
            else if(data.postDislikes.includes(match.params.id))
            setDislike(true)
            setUserData(data);
            setFlag(true);

        }
        catch (err) {

            console.log(err);
            // history.push('/signin');
        }
    }


    useEffect(() => {
        document.title = "Post Details Page";
        userAuthenticate();
    }, []);
    useEffect(() => {
       
        const fetchData = async () => {
            let data = await getPost(match.params.id);
            setPost(data);
            setLoader(false);
        }
        fetchData();
    });
    // console.log(post);

    //Deleting a post
    const deleteBlog = async () => {
        // var y = false;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    delet();
                    history.push("/");
                } else {
                    swal("Your Post is safe!");
                }
            });

    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const delet = async () => {
        await deletePost(post._id);
        swal("", "Post deleted successfully", "success");
        await sleep(3000);
    }
    const update=async(post)=>{
        await updatePost(match.params.id, post);

    }
    const max=(a,b)=>{
        if(a>b)
        return a;
        else
        return b;
    }
    const updateUser=async(user)=>{
        console.log(userData._id)
        await updateUserInfo(userData._id, user);
    }
    const toggleLike=()=>{
        var temPost=post;
        var tempUser=userData;
        if(dislike===true){
            setDislike(false);
            setUserData({...userData,["postDislikes"]:userData.postDislikes.filter(post=>post!==match.params.id),["postLikes"]:[...userData.postLikes,match.params.id]})
            temPost["noOfDislikes"]=max(0,temPost["noOfDislikes"]- 1);
            tempUser.postDislikes=userData.postDislikes.filter(post=>post!==match.params.id);
            setLike(true);
           
            temPost["noOfLikes"]+=1;
            tempUser.postLikes.push(match.params.id)
            setPost({...post,["noOfLikes"]:post.noOfLikes+1,["noOfDislikes"]:max(0,post.noOfDislikes-1)})
        
       
        }
        else{
        if(like===true){
        setLike(false)
        temPost["noOfLikes"]=max(0,temPost["noOfLikes"]- 1);
        tempUser.postLikes=userData.postLikes.filter(post=>post!==match.params.id);
        setUserData({...userData,["postLikes"]:userData.postLikes.filter(post=>post!==match.params.id)})
        setPost({...post,["noOfLikes"]:max(0,post.noOfLikes-1)})
        }
        else{
        setLike(true);
        temPost["noOfLikes"]+=1;
        tempUser.postLikes.push(match.params.id);
        setUserData({...userData,["postLikes"]:[...userData.postLikes,match.params.id]})
        setPost({...post,["noOfLikes"]:post.noOfLikes+1})
        }
    }
    console.log(userData.postLikes)
        update(temPost)
        updateUser(tempUser)
    }

    const toggleDislike=()=>{
        var temPost=post;
        var tempUser=userData;
        if(like===true){
            setLike(false);
            tempUser.postLikes=userData.postLikes.filter(post=>post!==match.params.id);
            setUserData({...userData,["postLikes"]:userData.postLikes.filter(post=>post!==match.params.id),["postDislikes"]:[...userData.postDislikes,match.params.id]})
            temPost["noOfLikes"]=max(0,temPost["noOfLikes"]- 1);
          
           
            setDislike(true);
            tempUser.postDislikes.push(match.params.id);
            temPost["noOfDislikes"]+=1;
            setPost({...post,["noOfLikes"]:max(0,post.noOfLikes-1),["noOfDislikes"]:post.noOfDislikes+1})
        
       
        }
        else{
        if(dislike===true){
        setDislike(false)
        tempUser.postDislikes=userData.postDislikes.filter(post=>post!==match.params.id);
        setUserData({...userData,["postDislikes"]:userData.postDislikes.filter(post=>post!==match.params.id)})
        temPost["noOfDislikes"]=max(0,temPost["noOfDislikes"]- 1);
          
        setPost({...post,["noOfDislikes"]:max(0,post.noOfDislikes-1)})
        }
        else{
        setDislike(true);
        tempUser.postDislikes.push(match.params.id);
        temPost["noOfDislikes"]+=1;
        setUserData({...userData,["postDislikes"]:[...userData.postDislikes,match.params.id]})
        setPost({...post,["noOfDislikes"]:post.noOfDislikes+1})
        }
       
    }
    updateUser(tempUser)
update(temPost)
    }
    const showError=()=>{
        setTimeout(toast.error("You cannot like or dislike your own post", {
            position: "top-center",
          }), 3000);
    }
    useEffect(()=>{
        document.title="Your Post - Blogspoint";
        userAuthenticate();
        //  console.log(fliterPosts)
       
        
    },[]);
    if (loader)
        return <Loader />
    return (
        <>
          <ToastContainer/>
            <div className={`${styles.container}`}>
                <div className={`${styles.first_inner_container}`}>
                    <div className={`${styles.title}`}>

                        <p>{post.title}</p>
                        {
                            (post.isUpdated===true)&&<span>(edited)</span>
                        }
                    </div>
                   
                </div>
                <div className={`${styles.second_inner_container}`}>
                <p>
                      
                        {post.username}
                    </p>
                    <p>
                        <label htmlFor="Created_date">Created Date : </label>
                        {new Date(post.createdDate).toDateString()}
                    </p>
                    {
                        (flag === true) && (userData.username === post.username) && <div className={`${styles.edit_update}`}>
                            <Link to={`/update/${post._id}`}><AiFillEdit /></Link>

                            <div className={`${styles.delete}`}><MdDelete onClick={() => deleteBlog()} /></div>
                        </div>
                    }
                    {
                        (flag === true) && (userData.username !== post.username) &&<div className={`${styles.like_dislike}`}>
                            <div className={`${styles.like}`} >
                                {
                                    like===false?<AiOutlineLike onClick={()=>toggleLike()}/>:<AiFillLike onClick={()=>toggleLike()}/>}{post.noOfLikes}</div>
                            <div className={`${styles.dislike}`}>
                                {dislike===false?<AiOutlineDislike  onClick={()=>toggleDislike()}/>:<AiFillDislike  onClick={()=>toggleDislike()}/>}{post.noOfDislikes}</div>
                        </div>
                    }
                     {
                        (flag === true) && (userData.username === post.username) &&<div className={`${styles.like_dislike}`}>
                            <div className={`${styles.like}`} >
                                
                                    <AiOutlineLike onClick={()=>showError()}/>{post.noOfLikes}</div>
                            <div className={`${styles.dislike}`}>
                               <AiOutlineDislike onClick={()=>showError()}/>{post.noOfDislikes}</div>
                        </div>
                    }
                </div>

                {/* <div className=> */}
                <textarea
                    className={`${styles.third_inner_container}`}
                   

                    name="description"
                    readOnly

                >{post.description}</textarea>
                {/* <p>{
                    for(var i=0;i<post.description.length;i++){

                    }

                }</p>
                {
                    console.log(post.description)
                } */}
                {/* </div> */}
                {
                post.categories.length?<div className="tag_field" >
                    Tags : 
          {
            post.categories.map((tag,index)=>(
              <div className="tag_input">
                {tag}
               
              </div>
            ))
          }
                
                
      </div>:<div></div>
}
            </div>
           
        </>
    )
}
export default DetailView;