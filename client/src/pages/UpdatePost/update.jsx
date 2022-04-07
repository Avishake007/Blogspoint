/**
 * @Page Update Page
 * @Desc This page updates the page of the user
 */
//Third Party imports
import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
//StyleSheet imports
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// Local imports
import Loader from "../../Components/Loader/loader";
import { getPost, updatePost } from "../../methods/crud/post";
const UpdatePage = ({ match }) => {
  /**
   * @UseHistory_Declaration
   */
  const history = useHistory();
  /**
   * @UseStates_Declaration
   */
  /**
   * @State_Name loader
   * @Func Shows the loader Page when the page is loading
   * @Type Boolean
   */
  const [loader, setLoader] = useState(true);
  /**
   * @State_Name post
   * @Func Stores the details of the post
   * @Type Object
   */
  const [post, setPost] = useState({
    title: "",
    description: "",
    username: "",
    categories: "",
    createdDate: new Date(),
  });
  /**
   * @State_Name editorState
   * @Func Stores the description typed in by the user
   * @Type EditorState
   */
  const [editorState, _editorState] = useState();
  //Stores the user's login details to userData
  const userData = JSON.parse(localStorage.getItem("userLogin"));

  /**
   * @UseEffect_Declaration
   */
  useEffect(() => {
    document.title = "Update Page - Blogspoint";
    /**
     * @Function_Name fetchData
     * @Desc Fetches the user's post details from the database
     * @Return_Type void
     */
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      setPost(data?.post);
      setLoader(false);
      const blocksFromHtml = htmlToDraft(data?.post?.description);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      _editorState(EditorState.createWithContent(contentState));
    };
    fetchData();
  }, []);

  /**
   * @Function_Name handleInputs
   * @Desc Updates the user's post and toogles the isUpdated value to true
   * @Return_Type void
   */
  const handleInputs = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setPost({ ...post, [name]: value, isUpdated: true });
  };
  /**
   * @Function_Name sleep
   * @Desc Provides delay for ms milliseconds
   * @Return_Type Promise
   */
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  /**
   * @Function_Name updatePostDetails
   * @Desc Updates user post details
   * @Return_Type void
   */
  const updatePostDetails = async () => {
    if (
      post?.title !== "" &&
      post?.description !== "" &&
      post?.description?.length > 8
    ) {
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
  /**
   * @Function_Name addTags
   * @Desc Adds tags to the tags field
   * @Return_Type void
   */
  const addTags = (e) => {
    if (
      e.target.value !== "" &&
      post.categories.includes(e.target.value) === false
    ) {
      setPost({
        ...post,
        categories: [...post.categories, e.target.value],
      });
      e.target.value = "";
    }
  };

  /**
   * @Function_Name deleteTags
   * @Desc Delete tags from the tag field when the user clicks on the cross icon behind the tag
   * @Return_Type void
   */
  const deleteTags = (delIndex) => {
    setPost({
      ...post,
      categories: post.categories.filter((_, index) => index !== delIndex),
    });
  };
  /**
   * @Function_Name onEditorStateChange
   * @Desc Updates the post's description
   * @Return_Type void
   */
  const onEditorStateChange = (editorState) => {
    setPost({
      ...post,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
    _editorState(editorState);
  };
  //If the user is not signed in then push the user to the signIn Page
  if (userData === null) history.push("/signin");
  //Displays the loader when the page is loading
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
              value={post?.title}
              onChange={(e) => handleInputs(e)}
              name="title"
              type="text"
              autoFocus="off"
            />
            {/* Update Button */}
            <div className="writeSubmit" onClick={() => updatePostDetails()}>
              Update
            </div>
          </div>
          {/* Description */}
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
      {/* Tags Section */}
      <div className="tag_field">
        {post?.categories.length ? (
          post?.categories.map((tag, index) => (
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
