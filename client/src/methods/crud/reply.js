/**
 * @Api_Name Reply Api
 */
// Third Party import
import axios from "axios";
/**
 * @Function_Name createReply
 * @Func It creates reply by posting it in the database under reply scheme
 * @Return_Type void
 */
export const createReply = async (reply) => {
  try {
    return await axios.post(`/reply/create`, reply);
  } catch (error) {
    console.log("Error while calling createReply API ", error);
  }
};
/**
 * @Function_Name getReplyByCommentId
 * @Func It fetches reply from the database according to comment id
 * @Return_Type void
 */
export const getReplyByCommentId = async (id) => {
  try {
    let response = await axios.get(`/reply/comment/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getReply API ", error);
  }
};
/**
 * @Function_Name updateReply
 * @Func It updates a user's reply
 * @Return_Type void
 */
export const updateReply = async (id, reply) => {
  try {
    return await axios.post(`/reply/update/${id}`, reply);
  } catch (error) {
    console.log("Error while calling updateReply API ", error);
  }
};
/**
 * @Function_Name deleteReply
 * @Func It deletes reply a user's reply according to reply id
 * @Return_Type void
 */
export const deleteReply = async (id) => {
  try {
    return await axios.delete(`/reply/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deleteReply API ", error);
  }
};
/**
 * @Function_Name deleteReplyByCommentId
 * @Func It deletes replies from the database according by comment id
 * @Return_Type void
 */
export const deleteReplyByCommentId = async (id) => {
  try {
    return await axios.delete(`/reply/delete/comment/${id}`);
  } catch (error) {
    console.log("Error while calling deleteReplyByCommentId API ", error);
  }
};
/**
 * @Function_Name deleteReplyByPostId
 * @Func It deletes replies from the database according to post id
 * @Return_Type void
 */
export const deleteReplyByPostId = async (id) => {
  try {
    return await axios.delete(`/reply/delete/post/${id}`);
  } catch (error) {
    console.log("Error while calling deleteReplyByPostId API ", error);
  }
};
