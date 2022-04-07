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
require("../db/conn");
/**
 * DESC: CREATE USER'S COMMENT
 * METHOD: POST
 * CONTROLLER:commentController.create_comment
 * ENDPOINT: /comment/
 */
router.post("/create", create_comment);
/**
 * DESC: GETTING A COMMENT DETAILS THROUGH COMMENT ID
 * METHOD: GET
 * CONTROLLER:commentController.get_comment
 * ENDPOINT: /comment/
 */
router.get("/:id", get_comment);
/**
 * DESC: GETTING COMMENTS DETAILS THROUGH POST ID
 * METHOD: POST
 * CONTROLLER:commentController.get_comment_by_postId
 * ENDPOINT: /comment/
 */
router.get("/post/:id", get_comment_by_postId);
/**
 * DESC: UPDATE USER'S COMMENT
 * METHOD: PUT
 * CONTROLLER:commentController.update_comment
 * ENDPOINT: /comment/
 */
router.put("/update/:id", update_comment);
/**
 * DESC: DELETE USER'S COMMENT
 * METHOD: DELETE
 * CONTROLLER:commentController.delete_comment
 * ENDPOINT: /comment/
 */
router.delete("/delete/:id", delete_comment);
/**
 * DESC: DELETE A USER'S COMMENT THROUGH POST ID
 * METHOD: DELETE
 * CONTROLLER:commentController.delte_comment_by_postId
 * ENDPOINT: /comment/
 */
router.delete("/delete/post/:id", delete_comment_by_postId);
module.exports = router;
