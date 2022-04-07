//Third Party import
const router = require("express").Router();
const {
  create_post,
  get_post_by_postId,
  get_post_by_userId,
  get_all_posts,
  update_post,
  delete_post,
} = require("../controllers/postController");
require("../db/conn");
/**
 * DESC: CREATE USER'S POST
 * METHOD: POST
 * CONTROLLER:postController.create_post
 * ENDPOINT: /post/
 */
router.post("/create", create_post);
/**
 * DESC: GETTING A USER'S POST DETAILS TTHROUGH POST ID
 * METHOD: GET
 * CONTROLLER:postController.get_post_by_id
 * ENDPOINT: /post/
 */
router.get("/:id", get_post_by_postId);
/**
 * DESC: GETTING A USER'S POST DETAILS THROUGH USER ID 
 * METHOD: GET
 * CONTROLLER:postController.get_post_by_userId
 * ENDPOINT: /post/
 */
router.get("/user/:id", get_post_by_userId);
/**
 * DESC: FETCHES ALL POSTS
 * METHOD: GET
 * CONTROLLER:postController.get_all_post
 * ENDPOINT: /post/
 */
router.get("/", get_all_posts);
/**
 * DESC: UPDATE A USER'S POST
 * METHOD: POST
 * CONTROLLER:postController.update_post
 * ENDPOINT: /post/
 */
router.post("/update/:id", update_post);

/**
 * DESC: DELETE A USER'S POST
 * METHOD: DELETE
 * CONTROLLER:postController.delete_post
 * ENDPOINT: /post/
 */
router.delete("/delete/:id", delete_post);
module.exports = router;
