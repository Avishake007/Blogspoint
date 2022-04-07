/**
 * @Api_Name Post Api
 */
// Third Party import
import axios from "axios";
/**
 * @Function_Name createPost
 * @Func It creates post by posting it in the database under post scheme
 * @Return_Type void
 */
export const createPost = async (post) => {
  try {
    return await axios.post(`post/create`, post);
  } catch (error) {
    console.log("Error while calling createPost API ", error);
  }
};
/**
 * @Function_Name getAllPosts
 * @Func It fetches the posts of all user from the database
 * @Return_Type void
 */
export const getAllPosts = async (param) => {
  try {
    let response = await axios.get(`/post${param}`);

    return response.data;
  } catch (error) {
    console.log("Error while calling getPosts API ", error);
  }
};
/**
 * @Function_Name getPostByUsername
 * @Func It fetches the post from the database according to username
 * @Return_Type void
 */
export const getPostByUsername = async (id) => {
  try {
    let response = await axios.get(`/post/user/${id}`);

    return response.data;
  } catch (error) {
    console.log("Error while calling getPost API ", error);
  }
};
/**
 * @Function_Name getPost
 * @Func It fetches the post from the database according to post id
 * @Return_Type void
 */
export const getPost = async (id) => {
  try {
    let response = await axios.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getPost API ", error);
  }
};

/**
 * @Function_Name updatePost
 * @Func It updates/edits a user's post
 * @Return_Type void
 */
export const updatePost = async (id, post) => {
  try {
    return await axios.post(`/post/update/${id}`, post);
  } catch (error) {
    console.log("Error while calling updatePost API ", error);
  }
};
/**
 * @Function_Name deletePost
 * @Func It deletes the post from the database
 * @Return_Type void
 */
export const deletePost = async (id) => {
  try {
    return await axios.delete(`/post/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deletePost API ", error);
  }
};
