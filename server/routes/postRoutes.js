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
//Creating a post
router.post("/create", create_post);
// Fetching the post details according to post id
router.get("/:id", get_post_by_postId);
//Fetching the post details according to user id
router.get("/user/:id", get_post_by_userId);
//Fecthing all posts
router.get("/", get_all_posts);
//Updating a post according to post id
router.post("/update/:id", update_post);

//Deleting a post according to post id
router.delete("/delete/:id", delete_post);
module.exports = router;
