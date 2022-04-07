/**
 * @APi_Name User Api
 */
// Third Party import
import axios from "axios";

/**
 * @Function_Name getUserDetails
 * @Func It fetches a user's detail according to user's id
 * @Return_Type void
 */
export const getUserDetails = async (id) => {
  try {
    let response = await axios.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getUser API ", error);
  }
};
/**
 * @Function_Name updateUserInformation
 * @Func It updates a user's information
 * @Return_Type void
 */
export const updateUserInformation = async (id, user) => {
  try {
    return await axios.post(`/user/update/info/${id}`, user);
  } catch (error) {
    console.log("Error while calling updatePost API ", error);
  }
};
/**
 * @Function_Name updateUserInfo
 * @Func It update's a user's pic
 * @Return_Type void
 */
export const updateUserInfo = async (id, formData, user) => {
  try {
    return await axios.post(`/user/update/${id}`, formData, user);
  } catch (error) {
    console.log("Error while calling updatePost API ", error);
  }
};
