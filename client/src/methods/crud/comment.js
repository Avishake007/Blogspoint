// Third Party import
import axios from "axios";
//Function to create a comment
export const createComment = async (comment) => {
  try {
    return await axios.post(`/comment/create`, comment);
  } catch (error) {
    console.log("Error while calling createComment API ", error);
  }
};
//Function to get a comment according to user id
export const getComment = async (id) => {
  try {
    let response = await axios.get(`/comment/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getComment API ", error);
  }
};
export const getCommentByPostId = async (id) => {
  try {
    let response = await axios.get(`/comment/post/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getComment API ", error);
  }
};

//Function to update a particular user's comment
export const updateComment = async (id, comment) => {
  try {
    return await axios.put(`/comment/update/${id}`, comment);
  } catch (error) {
    console.log("Error while calling updateComment API ", error);
  }
};
//Function to delete a user's comment by comment id
export const deleteComment = async (id) => {
  try {
    return await axios.delete(`/comment/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deleteComment API ", error);
  }
};
//Function to delete comments by post id
export const deleteCommentByPostId = async (id) => {
  try {
    return await axios.delete(`/comment/delete/post/${id}`);
  } catch (error) {
    console.log("Error while calling deleteCommentByPostId API ", error);
  }
};
