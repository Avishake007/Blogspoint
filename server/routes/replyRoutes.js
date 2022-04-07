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
/**
 * DESC: CREATE USER'S REPLY
 * METHOD: POST
 * CONTROLLER:replyController.create_reply
 * ENDPOINT: /reply/
 */
router.post("/create", create_reply);
/**
 * DESC: GETTING USER'S REPLIES THROUGH COMMENT ID
 * METHOD: GET
 * CONTROLLER:replyController.get_reply
 * ENDPOINT: /reply/
 */
router.get("/comment/:id", get_reply);
/**
 * DESC: UPDATING A USER'S REPLY THROUGH REPLY ID
 * METHOD: POST
 * CONTROLLER:replyController.update_reply
 * ENDPOINT: /reply/
 */
router.post("/update/:id", update_reply);
/**
 * DESC: DELETING A USER'S REPLY THROUGH REPLY ID
 * METHOD: DELETE
 * CONTROLLER:replyController.delete_reply
 * ENDPOINT: /reply/
 */
router.delete("/delete/:id", delete_reply);
/**
 * DESC: DELETING REPLIES THROUGH COMMENT ID 
 * METHOD: DELETE
 * CONTROLLER:replyController.delete_replies_by_commentId
 * ENDPOINT: /reply/
 */
router.delete("/delete/comment/:id", delete_replies_by_commentId);
/**
 * DESC: DELETING REPLIES THROUGH POST ID
 * METHOD: DELETE
 * CONTROLLER:replyController.delete_replies_by_postId
 * ENDPOINT: /reply/
 */
router.delete("/delete/post/:id", delete_replies_by_postId);
module.exports = router;
