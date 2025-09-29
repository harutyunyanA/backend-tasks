import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import authRoutes from "./routes/auth.js";
import sequelize from "./db/config.js";

const app = express();
const docs = YAML.load("./docs/api.yaml");

app.use(express.json());
app.use(express.urlencoded());

sequelize.sync();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({ message: "hello" });
});

app.listen(4002, () => console.log("http://localhost:4002/api-docs"));
