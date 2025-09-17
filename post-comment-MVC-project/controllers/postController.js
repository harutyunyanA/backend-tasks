import { getAllPosts, addDataToDB } from "../lib/db.js";

class PostController {
  addPostMainPage(req, res) {
    res.render("addPost");
  }

  async addNewPost(req, res) {
    await addDataToDB(req.body);
    const data = await getAllPosts();
    res.render("home", { data });
  }
}

export default new PostController();
