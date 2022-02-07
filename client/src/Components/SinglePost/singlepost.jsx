//Third Party imports
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
  AiFillEdit,
} from "react-icons/ai";
//StyleSheets imports
import styles from "./singlepost.module.css";
//Local imports
import Loader from "../Skeleton Loader/Posts/post";
import { getPost, deletePost, updatePost } from "../../methods/crud/post";

const SinglePost = ({ flaged, user, match }) => {
  //UseHistory Declarations
  const history = useHistory();
  //UseState Declarations
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
  });
  const [flag, setFlag] = useState(flaged);
  const [loader, setLoader] = useState(true);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  //UseEffect Declarations
  useEffect(() => {
    const fetchData = async () => {
      let data = await getPost(match.params.id);
      setPost(data);

      if (data.likeUsers.includes(user._id)) setLike(true);
      else if (data.dislikeUsers.includes(user._id)) setDislike(true);
      setLoader(false);
    };

    fetchData();
  }, []);

  //Deleting a post
  const deleteBlog = async () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        delet();
        history.push("/");
      } else {
        swal("Your Post is safe!");
      }
    });
  };
  //Providing delay for ms milliseconds
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const delet = async () => {
    await deletePost(post._id);
    swal("", "Post deleted successfully", "success");
    await sleep(3000);
  };
  //Updating a Post
  useEffect(() => {
    const update = async (post) => {
      await updatePost(match.params.id, post);
    };
    update(post);
  }, [post]);
  //Finding the maximum between a and b
  const max = (a, b) => {
    if (a > b) return a;
    else return b;
  };
  //Updates the post information when a user likes a post
  const toggleLike = () => {
    if (dislike === true) {
      setDislike(false);
      setLike(true);

      setPost({
        ...post,
        ["noOfLikes"]: post.noOfLikes + 1,
        ["noOfDislikes"]: max(0, post.noOfDislikes - 1),
        ["dislikeUsers"]: post.dislikeUsers.filter(
          (curruser) => curruser !== user._id
        ),
        ["likeUsers"]: [...post.likeUsers, user._id],
      });
    } else {
      if (like === true) {
        setLike(false);

        setPost({
          ...post,
          ["noOfLikes"]: max(0, post.noOfLikes - 1),
          ["likeUsers"]: post.likeUsers.filter(
            (cuurUser) => cuurUser !== user._id
          ),
        });
      } else {
        setLike(true);

        setPost({
          ...post,
          ["noOfLikes"]: post.noOfLikes + 1,
          ["likeUsers"]: [...post.likeUsers, user._id],
        });
      }
    }
  };
  //Updates post information when a user dislikes a post
  const toggleDislike = () => {
    if (like === true) {
      setLike(false);

      setDislike(true);

      setPost({
        ...post,
        ["noOfLikes"]: max(0, post.noOfLikes - 1),
        ["noOfDislikes"]: post.noOfDislikes + 1,
        ["likeUsers"]: post.likeUsers.filter(
          (currUser) => currUser !== user._id
        ),
        ["dislikeUsers"]: [...post.dislikeUsers, user._id],
      });
    } else {
      if (dislike === true) {
        setDislike(false);

        setPost({
          ...post,
          ["noOfDislikes"]: max(0, post.noOfDislikes - 1),
          ["dislikeUsers"]: post.dislikeUsers.filter(
            (currUser) => currUser !== user._id
          ),
        });
      } else {
        setDislike(true);

        setPost({
          ...post,
          ["noOfDislikes"]: post.noOfDislikes + 1,
          ["dislikeUsers"]: [...post.dislikeUsers, user._id],
        });
      }
    }
  };
  //If a user tries to like or dislike his own post then this error is shown
  const showError = () => {
    setTimeout(
      toast.error("You cannot like or dislike your own post", {
        position: "top-center",
      }),
      3000
    );
  };
  //Loader Functionality
  if (loader) <Loader />;
  return (
    <>
      <div className={`${styles.first_inner_container}`}>
        <div className={`${styles.title}`}>
          <p>{post.title}</p>
          {post.isUpdated === true && <span>(edited)</span>}
        </div>
      </div>
      <div className={`${styles.second_inner_container}`}>
        <p>{post.username}</p>
        <p>
          <label htmlFor="Created_date">Created Date : </label>
          {new Date(post.createdDate).toDateString()}
        </p>
        {flag === true && user.username === post.username && (
          <div className={`${styles.edit_update}`}>
            <Link to={`/update/${post._id}`}>
              <AiFillEdit />
            </Link>

            <div className={`${styles.delete}`}>
              <MdDelete onClick={() => deleteBlog()} />
            </div>
          </div>
        )}
        {flag === true && user.username !== post.username && (
          <div className={`${styles.like_dislike}`}>
            <div className={`${styles.like}`}>
              {like === false ? (
                <AiOutlineLike onClick={() => toggleLike()} />
              ) : (
                <AiFillLike onClick={() => toggleLike()} />
              )}
              {post.noOfLikes}
            </div>
            <div className={`${styles.dislike}`}>
              {dislike === false ? (
                <AiOutlineDislike onClick={() => toggleDislike()} />
              ) : (
                <AiFillDislike onClick={() => toggleDislike()} />
              )}
              {post.noOfDislikes}
            </div>
          </div>
        )}
        {flag === true && user.username === post.username && (
          <div className={`${styles.like_dislike}`}>
            <div className={`${styles.like}`}>
              <AiOutlineLike onClick={() => showError()} />
              {post.noOfLikes}
            </div>
            <div className={`${styles.dislike}`}>
              <AiOutlineDislike onClick={() => showError()} />
              {post.noOfDislikes}
            </div>
          </div>
        )}
      </div>

      <textarea
        className={`${styles.third_inner_container}`}
        name="description"
        readOnly
        value={post.description}
      />
      {post.categories.length ? (
        <div
          className="tag_field"
          style={{ background: "var(--primary_color)" }}
        >
          Tags :
          {post.categories.map((tag, index) => (
            <div className="tag_input">{tag}</div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default SinglePost;
