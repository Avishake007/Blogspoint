// Third Party import
import axios from "axios";

//Function to get a user according to user id
export const getUserDetails = async (id) => {
  try {
    let response = await axios.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getUser API ", error);
  }
};
//Function to update a particular user's information
export const updateUserInformation = async (id, user) => {
  try {
    return await axios.post(`/user/update/info/${id}`, user);
  } catch (error) {
    console.log("Error while calling updatePost API ", error);
  }
};
//Function to update a particular user's information
export const updateUserInfo = async (id, formData,user) => {
  try {
    return await axios.post(`/user/update/${id}`, formData,user);
  } catch (error) {
    console.log("Error while calling updatePost API ", error);
  }
};
