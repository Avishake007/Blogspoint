const Post = require("../model/post");

exports.create_post = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();
    res.status(200).json({
      message: "Post created Successfully",
      post: post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      post: null,
    });
  }
};
exports.get_post_by_postId = async (request, response) => {
  const { id } = request.params;
  try {
    const post = await Post.findOne({ _id: id });
    if (post) {
      response.status(200).json({
        message: `Post found with id :${id}`,
        post: post,
      });
    } else {
      response.status(404).json({
        message: `No Post with id : ${id}`,
        post: null,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
      post: null,
    });
  }
};
exports.get_post_by_userId = async (request, response) => {
  const { id } = request.params;
  try {
    const posts = await Post.find({ userId: id });
    if (posts)
      response.status(200).json({
        message: `Post/s found with user ID : ${id}`,
        posts: posts,
      });
    else
      response.status(404).json({
        message: `No post/s found with user Id : ${id}`,
        posts: null,
      });
  } catch (error) {
    response.status(500).json({
      message: error.message,
      posts: null,
    });
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
    if (posts) {
      response.status(200).json({
        message: `Posts found with Username : ${username} and/or category : ${category}`,
        posts: posts,
      });
    } else {
      response.status(404).json({
        message: `No posts found with Username : ${username} and/or category : ${category}`,
        posts: null,
      });
    }
  } catch (error) {
    response.status(200).json({
      message: error.message,
      posts: null,
    });
  }
};
exports.update_post = async (request, response) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(request.params.id, {
      $set: request.body,
    });
    if (updatedPost) {
      response.status(200).json({
        message: `Post with id ${id} is updated`,
        updatedPost: updatedPost,
      });
    } else {
      response.status(404).json({
        message: `No Post with id ${id}`,
        updatedPost: null,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
      updatedPost: null,
    });
  }
};
exports.delete_post = async (request, response) => {
  const { id } = request.params;
  try {
    const post = await Post.findById(id);

    await post.delete();
    if (post) {
      response.status(200).json({
        message: `Post deleted with id ${id}`,
        deletedPost: post,
      });
    } else {
      response.status(404).json({
        message: `No post with id ${id}`,
        deletedPost: null,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
      deletedPost: null,
    });
  }
};
