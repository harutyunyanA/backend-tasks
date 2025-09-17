import { readFile, writeFile } from "fs/promises";

export const getAllPosts = async () => {
  const data = await readFile("./lib/data.json", "utf-8");
  if (!data) return [];
  return JSON.parse(data);
};

export const getAllComments = async () => {
  const result = await readFile("./lib/comments.json", "utf-8");
  if (!result) return [];
  return JSON.parse(result);
};

export const addDataToDB = async (data) => {
  const result = await getAllPosts();
  const id = Date.now();
  result.push({ ...data, id: id });
  const comments = await getAllComments();
  comments.push({
    id: id,
    comments: [],
  });

  await writeFile("./lib/comments.json", JSON.stringify(comments));
  await writeFile("./lib/data.json", JSON.stringify(result));
};

export const getPostById = async (id) => {
  const data = await getAllPosts();
  const post = data.find((item) => item.id === Number(id));
  return post;
};

export const getCommentsByPostId = async (id) => {
  const result = JSON.parse(await readFile("./lib/comments.json", "utf-8"));
  if (!result) return [];
  const comments = result.find((item) => item.id === Number(id));
  return comments.comments;
};

export const addComment = async ({ text }, id) => {
  const comments = await getAllComments();
  for (let item of comments) {
    if (item.id === Number(id)) {
      item.comments.push({
        commentID: Date.now(),
        text: text,
      });
      break;
    }
  }
  await writeFile("./lib/comments.json", JSON.stringify(comments));
};
