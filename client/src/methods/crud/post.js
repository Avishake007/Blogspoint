// Third Party import
import axios from "axios";
//Function to create a post
export const createPost = async (post) => {
  try {
    return await axios.post(`post/create`, post);
  } catch (error) {
    console.log("Error while calling createPost API ", error);
  }
};
//Function to get all posts
export const getAllPosts = async (param) => {
  try {
    let response = await axios.get(`/post${param}`);

    return response.data;
  } catch (error) {
    console.log("Error while calling getPosts API ", error);
  }
};
//Get post by Username
export const getPostByUsername = async (id) => {
  try {
    let response = await axios.get(`/post/user/${id}`);

    return response.data;
  } catch (error) {
    console.log("Error while calling getPost API ", error);
  }
};
//Function to get a post according to user id
export const getPost = async (id) => {
  try {
    let response = await axios.get(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getPost API ", error);
  }
};

//Function to update a particular user's post
export const updatePost = async (id, post) => {
  try {
    return await axios.post(`/post/update/${id}`, post);
  } catch (error) {
    console.log("Error while calling updatePost API ", error);
  }
};
//Function to delete a user's post
export const deletePost = async (id) => {
  try {
    return await axios.delete(`/post/delete/${id}`);
  } catch (error) {
    console.log("Error while calling deletePost API ", error);
  }
};
