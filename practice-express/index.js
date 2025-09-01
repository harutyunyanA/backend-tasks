const express = require("express");
const app = express();
const { readData, saveData } = require("./lib/db");
app.set("view engine", "pug");
app.set("views", "./pages");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", async (req, res) => {
  const data = await readData("./lib/data.json");
  res.render("home", { data });
});
app.get("/add", (req, res) => {
  res.render("add");
});
app.get("/users", async (req, res) => {
  const data = await readData("./lib/data.json");
  res.render("list", { data });
});
app.post("/add", async (req, res) => {
  const data = req.body;
  let err = false;
  if (req.body.name.trim().length == 0 || req.body.surname.trim().length == 0) {
    err = true;
    res.render("add", { err });
  } else {
    await saveData(data, "./lib/data.json");
    err = false;
    res.redirect("/users");
  }
});

app.listen(4002, () => console.log("http://localhost:4002"));
