import express from "express";
import { connectDb, disconnectDb } from "./src/config/db.js";
import { userRouter } from "./src/routes/user.js";
import { env } from "./src/config/env.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/auth", userRouter);

app.listen(env.PORT, async () => {
  console.log(`Server started on: http://localhost:${env.PORT}`);
  await connectDb();
  console.log("Mongo Connected!");
});

process.on("SIGINT", () => disconnectDb());
process.on("SIGTERM", () => disconnectDb());
