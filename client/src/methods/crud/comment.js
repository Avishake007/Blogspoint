/**
 * @Api_Name Comment Api
 */
// Third Party import
import axios from "axios";
/**
 * @Function_Name createComment
 * @Func It creates comment by posting it in the database under comment scheme
 * @Return_Type void
 */
export const createComment = async (comment) => {
  try {
    return await axios.post(`/comment/create`, comment);
  } catch (error) {
    console.log("Error while calling createComment API ", error);
  }
};
/**
 * @Function_Name getComment
 * @Func It fetches comment from the database according to comment id
 * @Return_Type void
 */
export const getComment = async (id) => {
  try {
    let response = await axios.get(`/comment/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getComment API ", error);
  }
};
/**
 * @Function_Name getCommentByPostid
 * @Func It fetches comment from the database according to post Id
 * @Return_Type void
 */
export const getCommentByPostId = async (id) => {
  try {
    let response = await axios.get(`/comment/post/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getComment API ", error);
  }
};

/**
 * @Function_Name updateComment
 * @Func It updates/edits a user's comment
 * @Return_Type void
 */
export const updateComment = async (id, comment) => {
  try {
    return await axios.put(`/comment/update/${id}`, comment);
  } catch (error) {
    console.log("Error while calling updateComment API ", error);
  }
};
/**
 * @Function_Name deleteComment
 * @Func It deletes a user's comment
 * @Return_Type void
 */
export const deleteComment = async (id) => {
  try {
    return await axios.delete(`/comment/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deleteComment API ", error);
  }
};
/**
 * @Function_Name deleteCommentByPostId
 * @Func It deletes comments from the database according to post id
 * @Return_Type void
 */
export const deleteCommentByPostId = async (id) => {
  try {
    return await axios.delete(`/comment/delete/post/${id}`);
  } catch (error) {
    console.log("Error while calling deleteCommentByPostId API ", error);
  }
};
