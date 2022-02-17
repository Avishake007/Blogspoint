/**
 * Update Page
 * This page is used for updating a post
 */
//Third Party imports
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState,convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from "draftjs-to-html";
// Local imports
import Loader from "../../Components/Loader/loader";
import { getPost, updatePost } from "../../methods/crud/post";
const UpdatePage = ({ match }) => {
  //UseHistory Declarations
  const history = useHistory();
  //UseStates Declarations
  const [loader, setLoader] = useState(true);
  const [post, setPost] = useState({
    title: "",
    description: "",
    username: "",
    categories: "",
    createdDate: new Date(),
  });
  const [editorState,_editorState]=useState();
  const userData=JSON.parse(localStorage.getItem("userLogin"));
  
  //UseEffect Declarations
  useEffect(() => {
    document.title = "Update Page - Blogspoint";
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      setPost(data);
      setLoader(false);
      const blocksFromHtml = htmlToDraft(data?.description);
const { contentBlocks, entityMap } = blocksFromHtml;
const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
 _editorState(EditorState.createWithContent(contentState));
    };
    fetchData();
  }, []);

  //Store the post information
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value, "isUpdated": true });
  };
  //Providing delay for ms milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  //Updating a Post information to database
  const updateBlogPost = async () => {
    if (post?.title !== "" && post?.description !== ""&&post?.description?.length>8) {
      await updatePost(match.params.id, post);
      swal("Post updated successfully", "", "success");
      await sleep(3000);
      history.push(`/details/${match.params.id}`);
    } else {
      setTimeout(
        toast.error("Please do not keep the title and/or description empty", {
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
      post.categories.includes(e.target.value) === false
    ) {
      setPost({
        ...post,
        "categories": [...post.categories, e.target.value],
      });
      e.target.value = "";
    }
  };

  //Delete Tags
  const deleteTags = (delIndex) => {
    setPost({
      ...post,
      "categories": post.categories.filter((_, index) => index !== delIndex),
    });
  };
  const onEditorStateChange = (editorState) => {
    setPost({...post,"description":draftToHtml(convertToRaw(editorState.getCurrentContent()))})
    _editorState(editorState);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  if(userData===null)history.push("/signin")
  if (loader) return <Loader />;
  return (
    <>
      <ToastContainer />
      <div className="write">
        <form className="writeForm">
          <div className="writeFormGroup" id="field1">
            {/* Title */}
            <input
              className="writeInput"
              placeholder="Title"
              value={post.title}
              onChange={(e) => handleInputs(e)}
              name="title"
              type="text"
              autoFocus="off"
            />
            {/* Update Button */}
            <div className="writeSubmit" onClick={() => updateBlogPost()}>
              Update
            </div>
          </div>
          {/* Description */}
          <div className="writeFormGroup" id="field2">
            {/* <textarea
              className="writeText"
              placeholder="Tell your story..."
              type="text"
              value={post.description}
              onChange={(e) => handleInputs(e)}
              name="description"
              autoFocus="off"
            /> */}
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
      {/* Tags Section */}
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
export default UpdatePage;
