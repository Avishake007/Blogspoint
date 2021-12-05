import React, { useState, useEffect } from 'react';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
import { createPost } from '../crud/crud';
import {AiFillCloseCircle} from "react-icons/ai"; 
import './write.css';
import Loader from '../Loader/loader';
const Write = () => {
  var userID;
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [flag, setFlag] = useState(false);
  //Loader 
  const [loader, setLoader] = useState(true);
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
      setUserData(data);
      userID = data._id;
      console.log(userID)
      setPost({ ...post, ["userId"]: userID })

      setFlag(true);

    }
    catch (err) {

      console.log(err);
      // history.push('/signin');
    }
  }
  useEffect(() => {
    document.title = "Write - BlogsPoint";
    userAuthenticate();

    setLoader(false);
  }, []);

  const [post, setPost] = useState({
    title: '', description: '', username: '', categories: [], createdDate: new Date(), userId: userData._id,
    noOfLikes:0,noOfDislikes:0,isUpdated:false
  });
  if (flag === true) {
    setPost({ ...post, username: `${userData.username}` })
    // setPost({...post,userId:`${userID}`})
    setFlag(false);// To stop infinite re renders 
  }




  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value });

  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const savePost = async (e) => {
    e.preventDefault();
    if (post.title !== "" && post.description !== "") {
      console.log(post);
      await createPost(post);

      swal("", "Post created successfully", "success");
      await sleep(3000);
      history.push('/');
    }
    else {
      setTimeout(toast.error("Please do not keep the title and description empty", {
        position: "top-center",
      }), 3000);
    }
  }

  //Add Tags
  const addTags=(e)=>{
    if(e.target.value!==""&&post.categories.includes(e.target.value)===false){
    setPost({...post,["categories"]:[...post.categories,e.target.value]});
    e.target.value="";
    }
  }

  //Delete Tags
  const deleteTags=(delIndex)=>{
    setPost({...post,["categories"]:post.categories.filter((_,index)=>index!==delIndex)});
  }
  if (loader)
    return <Loader />
  return (
    <>
      <ToastContainer />
      <div className="write">

        <form className="writeForm">
          <div className="writeFormGroup" id="field1">

            <input
              className="writeInput"
              placeholder="Title"
              value={post.title}
              onChange={handleInputs}
              name="title"
              type="text"
              autoFocus="off"
            />
            <button className="writeSubmit" type="submit" onClick={savePost}>
              Publish
            </button>
          </div>
          <div className="writeFormGroup" id="field2">
            <textarea
              className="writeText"
              placeholder="Tell your story..."
              type="text"
              value={post.description}

              onChange={handleInputs}
              name="description"
              autoFocus="off"
            />
          </div>

        </form>
      </div>
      <div className="tag_field">
          {
            post.categories.length?post.categories.map((tag,index)=>(
              <div className="tag_input">
                {tag}
                <span><AiFillCloseCircle onClick={()=>deleteTags(index)}/></span>
              </div>
            )):<div></div>
          }
          <input type="text" onKeyUp={(e)=>e.key==='Enter'?addTags(e):null} placeholder="Please type your tag and then Press 'Enter'"/>
      </div>
    </>
  );
}
export default Write;