import { Comment, Post, User } from "../models/index.js";

class PostController {
  async addPost(req, res) {
    try {
      const { description } = req.body;

      if (!description.trim()) {
        res
          .status(400)
          .send({ message: "Please write some description for your post" });
      }
      console.log(req.file);
      const userId = req.user.id;
      const user = await User.findById(userId);
      const newPost = new Post({
        description: description,
        userId: userId,
        imageURL: req.file.filename,
      });

      await newPost.save();
      user.posts += 1;
      await user.save();

      res.send({ message: "post created", payload: newPost });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error. " + err.message });
    }
  }

  async addComment(req, res) {
    try {
      const { text } = req.body;
      const { id: postId } = req.params;
      const userId = req.user.id;

      if (!text.trim()) {
        res.status(400).send({ message: "Comment content required" });
      }

      const post = await Post.findById(postId);
      console.log(post);
      if (!post) {
        res.status(404).send({ message: "post not found" });
      }

      const newComment = new Comment({
        text: text,
        userId: userId,
        postId: postId,
      });

      post.comments.push(newComment._id);
      await newComment.save();
      await post.save();
      res.send({ message: "Comment created", payload: newComment });
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error " + err.message });
    }
  }

  async getPost(req, res) {
    try {
      const { id: postId } = req.params;
      const post = await Post.findById(postId).populate("comments");
      if (!post) {
        return res.status(404).send({ message: "Post not found" });
      }

      res.send(post);
    } catch (err) {
      return res
        .status(500)
        .send({ message: "Internal server error " + err.message });
    }
  }
}

export default new PostController();
