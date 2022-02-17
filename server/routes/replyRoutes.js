const {
  create_reply,
  get_reply,
  update_reply,
  delete_reply,
  delete_replies_by_commentId,
  delete_replies_by_postId,
} = require("../controllers/replyController");

//Third Party import
const router = require("express").Router();

require("../db/conn");
//Creating a reply
router.post("/create", create_reply);
//Fetching replies according to comment id
router.get("/comment/:id", get_reply);
//Updating a reply according to reply id
router.post("/update/:id", update_reply);
//Deleting a reply according to reply id
router.delete("/delete/:id", delete_reply);
//Deleting reply/s according to comment id
router.delete("/delete/comment/:id", delete_replies_by_commentId);
//Deleting reply/s according to post id
router.delete("/delete/post/:id", delete_replies_by_postId);
module.exports = router;
