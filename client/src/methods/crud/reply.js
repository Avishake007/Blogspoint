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
