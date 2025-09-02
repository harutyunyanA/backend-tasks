const express = require("express");
const { readData, addUser, deleteData, updateData } = require("./lib/db");
const app = express();

app.set("views", "./pages");
app.set("view engine", "pug");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  res.render("home");
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/add", async (req, res) => {
  const content = req.body;
  if (content.name.trim().length == 0 || content.surname.trim().length == 0) {
    let flag = true;
    res.render("add", { flag });
  } else {
    await addUser(content, "./lib/data.json");
    res.redirect("/");
  }
});
app.get("/users", async (req, res) => {
  const users = await readData("./lib/data.json");
  res.render("users", { users });
});
app.get("/users/delete/:id", async (req, res) => {
  const userId = req.params.id;
  await deleteData(userId, "./lib/data.json");
  res.redirect("/users");
});

app.get("/users/edit/:id", async (req, res) => {
  const userId = req.params.id;
  res.render("edit", { userId });
});

app.post("/user-edit/:id", async (req, res) => {
  const userId = req.params.id;
  const content = req.body;
  if (content.name.trim().length == 0 || content.surname.trim().length == 0) {
    let flag = true;
    res.render("edit", { flag });
  } else {
    await updateData(userId, content, "./lib/data.json");
    res.redirect("/users");
  }
});

app.listen(4002, () => console.log("http://localhost:4002"));
