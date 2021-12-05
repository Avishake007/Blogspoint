const mongoose=require('mongoose');
const commentSchema =new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
      
    },
   
    createdDate: {
        type: Date
    },
    postId:{
        type:String,
        required:true
    },
    noOfLikes:{
        type:Number,
    },
    noOfDislikes:{
        type:Number
    }
});


const Comment= mongoose.model('POST', commentSchema);
module.exports=Comment;