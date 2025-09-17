import express from "express";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { getAllPosts } from "./lib/db.js";
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded());
app.use("/addPost", postRoutes);
app.use("/post", commentRoutes);

app.get("/", async (req, res) => {
  const data = await getAllPosts();
  console.log("hello", data);
  res.render("home", { data });
});

app.listen(4002, () => console.log("http://localhost:4002"));
