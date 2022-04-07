/**
 * @Page Write Page
 * @Desc This page is used to write the post
 */
//Third Party imports
import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useHistory } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import swal from "sweetalert";
//StyleSheet imports
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./write.css";
//Local imports
import { createPost } from "../../methods/crud/post";
import Loader from "../../Components/Loader/loader";
const Write = () => {
  /**
   * @UseHistory_Declaration
   */
  const history = useHistory();
  /**
   * @UseStates_Declaration
   */
  /**
   * @State_Name loader
   * @Func Displays the loader when the page is loading
   * @Type Boolean
   */
  const [loader, _loader] = useState(true);
  /**
   * @State_Name post
   * @Func Stores the post details
   * @Type Object
   */
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
    likeUsers: [],
    dislikeUsers: [],
  });
  /**
   * @State_Name editorState
   * @Func Stores the description typed in by the user
   * @Type EditorState
   */
  const [editorState, _editorState] = useState(EditorState.createEmpty());
  //Stores the user login details to userData
  const [userData, _userData] = useState(
    JSON.parse(localStorage.getItem("userLogin"))
  );

  /**
   * @UseEffect_Declaration
   * @Func Fetches the username and userId from the post
   */
  useEffect(async () => {
    document.title = "Write - BlogsPoint";
    setPost({
      ...post,
      username: `${userData?.username}`,
      userId: `${userData?._id}`,
    });
    _loader(false);
  }, []);

  /**
   * @Function_Name handleInputs
   * @Desc Stores the post details
   * @Return_Type void
   */
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value });
  };
  /**
   * @Function_Name sleep
   * @Desc Provides delay for ms millisecond
   * @Return_Type Promise
   */
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  /**
   * @Function_Name savePost
   * @Desc Saving of created post to the database
   * @Return_Type void
   */
  const savePost = async (e) => {
    e.preventDefault();
    if (
      post?.title !== "" &&
      post?.description !== "" &&
      post?.description?.length > 8
    ) {
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

  /**
   * @Function_Name addTags
   * @Desc Adds tag to the tag's field
   * @Return_Type void
   */
  const addTags = (e) => {
    if (
      e.target.value !== "" &&
      post?.categories?.includes(e.target.value) === false
    ) {
      setPost({
        ...post,
        categories: [...post?.categories, e.target.value],
      });
      e.target.value = "";
    }
  };

  /**
   * @Function_Name deleteTags
   * @Desc Deletes tag from the tag's field
   * @Return_Type void
   */
  const deleteTags = (delIndex) => {
    setPost({
      ...post,
      categories: post?.categories.filter((_, index) => index !== delIndex),
    });
  };
  /**
   * @Function_Name onEditorStateChange
   * @Desc Stores the post description
   * @Return_Type void
   */
  const onEditorStateChange = (editorState) => {
    setPost({
      ...post,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
    _editorState(editorState);
  };
  //Displays loader when the page is loading
  if (loader) return <Loader />;
  //Pushes the user to the signIn Page if the user is not signed in
  else if (userData === null) history.push("/signin");
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
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
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
