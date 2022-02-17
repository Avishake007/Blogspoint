//Third Party import
const router = require("express").Router();
const {
  create_comment,
  get_comment,
  get_comment_by_postId,
  update_comment,
  delete_comment,
  delete_comment_by_postId,
} = require("../controllers/commentController");
//Imorting Comment Schema
const Comment = require("../model/comment");
require("../db/conn");
//Creating a comment
router.post("/create", create_comment);
//Fetching the comment details according to comment id
router.get("/:id", get_comment);
//Fetching the comment according to post id
router.get("/post/:id", get_comment_by_postId);
//Updating a comment according to comment id
router.put("/update/:id", update_comment);
//Deleting a comment according to comment id
router.delete("/delete/:id", delete_comment);
//Deleting comment/s according to post id
router.delete("/delete/post/:id", delete_comment_by_postId);
module.exports = router;
