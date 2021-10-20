const mongoose=require('mongoose');
const postSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:false
    },
    description: {
        type: String,
        required: true,
        unique:false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false   
    },
    createdDate: {
        type: Date
    },
    userId:{
        type:String,
        required:true
    }
});


const Post = mongoose.model('POST', postSchema);
module.exports=Post;