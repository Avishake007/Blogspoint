//Third party import
const mongoose = require("mongoose");
//Comment Schema
const commentSchema = new mongoose.Schema({
  postId: {
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

const Comment = mongoose.model("COMMENT", commentSchema);
module.exports = Comment;
