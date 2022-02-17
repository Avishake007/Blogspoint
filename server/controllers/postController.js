const Post = require("../model/post");

exports.create_post = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();
    res.status(200).json("Post saved successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.get_post_by_postId = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.get_post_by_userId = async (request, response) => {
  let posts;

  try {
    if (request.params.id) {
      posts = await Post.find({ userId: request.params.id });
    }
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.get_all_posts = async (request, response) => {
  let username = request.query.username;
  let category = request.query.category;
  let posts;
  try {
    if (username) posts = await Post.find({ username: username });
    else if (category) posts = await Post.find({ categories: category });
    else posts = await Post.find({});

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.update_post = async (request, response) => {
  try {
    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("post updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
exports.delete_post = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    await post.delete();

    response.status(200).json("post deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};
