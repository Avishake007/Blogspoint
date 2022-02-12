//Third Party imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
//Local imports
import { createPost } from "../../methods/crud/post";
import "./write.css";
import Loader from "../../Components/Loader/loader";
const Write = () => {
  //UseStates Declarations
  const history = useHistory();
  const [loader,_loader]=useState(true);
  const [post, setPost] = useState({
    title: "",
    description: "",
    username: "",
    categories: [],
    createdDate: new Date(),
    userID: "",
    noOfLikes: 0,
    noOfDislikes: 0,
    isUpdated: false,
    likeUsers:[],
    dislikeUsers:[]
  });
  //Check whether the user is authenticated
  const [userData,_userData] =useState(null);
  //useEffect Declarations
  useEffect(async() => {
    document.title = "Write - BlogsPoint";
    setPost({
      ...post,
      username: `${userData?.username}`,
      userId: `${userData?._id}`,
    });
    _userData(JSON.parse(localStorage.getItem("userLogin")))
    _loader(false)
  }, []);
 
  //Stores  title , description & tags  of a post
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value });
  };
  //Provides delay for ms milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //Saves or publishes the post
  const savePost = async (e) => {
    e.preventDefault();
    if (post?.title !== "" && post?.description !== "") {
      console.log(post);
      await createPost(post);

      swal("", "Post created successfully", "success");
      await sleep(3000);
      history.push("/");
    } else {
      setTimeout(
        toast.error("Please do not keep the title and description empty", {
          position: "top-center",
        }),
        3000
      );
    }
  };

  //Add Tags
  const addTags = (e) => {
    if (
      e.target.value !== "" &&
      post?.categories?.includes(e.target.value) === false
    ) {
      setPost({
        ...post,
        "categories": [...post?.categories, e.target.value],
      });
      e.target.value = "";
    }
  };

  //Delete Tags
  const deleteTags = (delIndex) => {
    setPost({
      ...post,
      "categories": post?.categories.filter((_, index) => index !== delIndex),
    });
  };
  if(loader) return <Loader/>
  else if(userData===null)history.push("/signin")
  return (
    <>
      <ToastContainer />
      <div className="write">
        <form className="writeForm">
          <div className="writeFormGroup" id="field1">
            {/* Title Field */}
            <input
              className="writeInput"
              placeholder="Title"
              value={post?.title}
              onChange={handleInputs}
              name="title"
              type="text"
              autoFocus="off"
            />
            <button className="writeSubmit" type="submit" onClick={savePost}>
              Publish
            </button>
          </div>
          {/* Description Field */}
          <div className="writeFormGroup" id="field2">
            <textarea
              className="writeText"
              placeholder="Tell your story..."
              type="text"
              value={post?.description}
              onChange={handleInputs}
              name="description"
              autoFocus="off"
            />
          </div>
        </form>
      </div>
      {/* Tags Field */}
      <div className="tag_field">
        {post.categories.length ? (
          post.categories.map((tag, index) => (
            <div className="tag_input">
              {tag}
              <span>
                <AiFillCloseCircle onClick={() => deleteTags(index)} />
              </span>
            </div>
          ))
        ) : (
          <div></div>
        )}
        <input
          type="text"
          onKeyUp={(e) => (e.key === "Enter" ? addTags(e) : null)}
          placeholder="Please type your tag and then Press 'Enter'"
        />
      </div>
    </>
  );
};
export default Write;
