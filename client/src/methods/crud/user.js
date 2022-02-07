// Third Party import
import axios from "axios";
//Function to update a particular user's information
export const updateUserInfo = async (id, user) => {
  try {
    return await axios.post(`/user/update/${id}`, user);
  } catch (error) {
    console.log("Error while calling updatePost API ", error);
  }
};
