import axios from 'axios';


//Function to create a post
export const createPost = async (post) => {
    try {
        return await axios.post(`/create`, post);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}
//Function to get all posts
export const getAllPosts = async (param) => {
    try {
        let response = await axios.get(`/posts${param}`);
       
        return response.data;
    } catch (error) {
        console.log('Error while calling getPosts API ', error)
    }
}
export const getPostByUsername=async (id)=>{
    try {
        let response = await axios.get(`/post/user/${id}`);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}
//Function to get a post according to user id 
export const getPost = async (id) => {
    try {
        let response = await axios.get(`/post/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}

//Function to update a particular user's post 
export const updatePost = async (id, post) => {
    try {
        return await axios.post(`/update/${id}`, post);
        
    } catch(error) {
        console.log('Error while calling updatePost API ', error)
    }
}
//Function to update a particular user's information 
export const updateUserInfo = async (id, user) => {
    try {
        console.log(id+" pp ")
        return await axios.post(`/user/update/${id}`, user);
        
    } catch(error) {
        console.log('Error while calling updatePost API ', error)
    }
}
//Function to delete a user's post
export const deletePost = async (id) => {
    try {
        return await axios.delete(`/delete/${id}`);
    } catch(error) {
        console.log('Error while calling deletePost API ', error)
    }
}
//Function to update a particular user's information 
export const updatePostUser = async (id, user) => {
    try {
        // console.log(id+" pp ")
        return await axios.post(`/post/user/update/${id}`, user);
        
    } catch(error) {
        console.log('Error while calling updatePost API ', error)
    }
}
//Function to create a comment
export const createComment = async (comment) => {
    try {
        return await axios.post(`/createComment`, comment);
    } catch (error) {
        console.log('Error while calling createComment API ', error);
    }
}
//Function to get a post according to user id 
export const getComment = async (id) => {
    try {
        let response = await axios.get(`/comment/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getComment API ', error);
    }
}
export const getCommentByPostId=async (id)=>{
    try {
        let response = await axios.get(`/comment/user/${id}`);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log('Error while calling getComment API ', error);
    }
}
//Function to update a particular user's information 
export const updateCommentUser = async (id, user) => {
    try {
        // console.log(id+" pp ")
        return await axios.post(`/comment/user/update/${id}`, user);
        
    } catch(error) {
        console.log('Error while calling updatePost API ', error)
    }
}
//Function to update a particular user's comment
export const updateComment = async (id, comment) => {
    try {
        return await axios.post(`/comment/update/${id}`, comment);
        
    } catch(error) {
        console.log('Error while calling updateComment API ', error)
    }
}
//Function to create a reply
export const createReply = async (reply) => {
    try {
        return await axios.post(`/reply/create`, reply);
    } catch (error) {
        console.log('Error while calling createReply API ', error);
    }
}
export const getReplyByCommentId=async (id)=>{
    try {
        let response = await axios.get(`/reply/comment/${id}`);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log('Error while calling getReply API ', error);
    }
}
//Function to update a particular user's reply
export const updateReply = async (id, reply) => {
    try {
        return await axios.post(`/reply/update/${id}`, reply);
        
    } catch(error) {
        console.log('Error while calling updateReply API ', error)
    }
}
//Function to update a particular user's information 
export const updateReplyUser = async (id, user) => {
    try {
        // console.log(id+" pp ")
        return await axios.post(`/reply/user/update/${id}`, user);
        
    } catch(error) {
        console.log('Error while calling updatePost API ', error)
    }
}