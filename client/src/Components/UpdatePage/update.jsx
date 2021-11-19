import React, { useState, useEffect } from 'react';

//React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import swal from "sweetalert";

//Loader
import Loader from '../Loader/loader';
import { useHistory } from 'react-router-dom';
import {AiFillCloseCircle} from "react-icons/ai"; 
import { getPost, updatePost } from '../crud/crud';
const UpdatePage = ({ match }) => {
  const history = useHistory();
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState({
    title: '', description: '', username: '', categories: '', createdDate: new Date()
  });
  useEffect(() => {
    document.title = "Update Page";
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      setPost(data);
      setLoader(false);
    }
    fetchData();
  }, [])
  console.log(match);
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value });

  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const updateBlogPost = async () => {
    await updatePost(match.params.id, post);
    swal("Post updated successfully", "", "success");
    await sleep(3000)
    history.push(`/details/${match.params.id}`);
  }
  //Add Tags
  const addTags = (e) => {
    if (e.target.value !== "") {
      setPost({ ...post, ["categories"]: [...post.categories, e.target.value] });
      e.target.value = "";
    }
  }

  //Delete Tags
  const deleteTags = (delIndex) => {
    setPost({ ...post, ["categories"]: post.categories.filter((_, index) => index !== delIndex) });
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
              onChange={(e) => handleInputs(e)}
              name="title"
              type="text"
              autoFocus="off"
            />
            <div className="writeSubmit" onClick={() => updateBlogPost()}>
              Update
            </div>
          </div>

          <div className="writeFormGroup" id="field2">
            <textarea
              className="writeText"
              placeholder="Tell your story..."
              type="text"
              value={post.description}

              onChange={(e) => handleInputs(e)}
              name="description"
              autoFocus="off"
            />
          </div>

        </form>
      </div>
      <div className="tag_field">
        {
          post.categories.length ? post.categories.map((tag, index) => (
            <div className="tag_input">
              {tag}
              <span><AiFillCloseCircle onClick={() => deleteTags(index)} /></span>
            </div>
          )) : <div></div>
        }
        <input type="text" onKeyUp={(e) => e.key === 'Enter' ? addTags(e) : null} placeholder="Please type your tag and then Press 'Enter'" />
      </div>
    </>
  );
}
export default UpdatePage;