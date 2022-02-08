// Third Party import
import axios from "axios";
//Function to create a reply
export const createReply = async (reply) => {
  try {
    return await axios.post(`/reply/create`, reply);
  } catch (error) {
    console.log("Error while calling createReply API ", error);
  }
};
export const getReplyByCommentId = async (id) => {
  try {
    let response = await axios.get(`/reply/comment/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getReply API ", error);
  }
};
//Function to update a particular user's reply
export const updateReply = async (id, reply) => {
  try {
    return await axios.post(`/reply/update/${id}`, reply);
  } catch (error) {
    console.log("Error while calling updateReply API ", error);
  }
};
//Function to delete a user's reply by reply id
export const deleteReply = async (id) => {
  try {
    return await axios.delete(`/reply/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deleteReply API ", error);
  }
};
//Function to delete replies by comment id
export const deleteReplyByCommentId = async (id) => {
  try {
    return await axios.delete(`/reply/delete/comment/${id}`);
  } catch (error) {
    console.log("Error while calling deleteReplyByCommentId API ", error);
  }
};
//Function to delete replies by post id
export const deleteReplyByPostId = async (id) => {
  try {
    return await axios.delete(`/reply/delete/post/${id}`);
  } catch (error) {
    console.log("Error while calling deleteReplyByPostId API ", error);
  }
};