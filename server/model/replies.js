//Third Party import
const mongoose = require("mongoose");
//Reply Schema
const replySchema = new mongoose.Schema({
  postId:{
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
  },
  noOfLikes: {
    type: Number,
  },
  noOfDislikes: {
    type: Number,
  },
  likeUsers: {
    type: Array,
    required: false,
  },
  dislikeUsers: {
    type: Array,
    required: false,
  },
});

const Replies = mongoose.model("REPLY", replySchema);
module.exports = Replies;
