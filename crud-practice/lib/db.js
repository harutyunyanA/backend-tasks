const { readFile, writeFile } = require("fs/promises");

async function readData(path) {
  const data = await readFile(path, "utf-8");
  if (!data) {
    return [];
  }
  return JSON.parse(data);
}

async function addUser(user, path) {
  const data = await readData(path);
  user.id = Date.now();
  data.push(user);
  await writeData(path, data);
}

async function writeData(path, data) {
  await writeFile(path, JSON.stringify(data));
}

async function deleteData(userId, path) {
  const data = await readData(path);
  const filteredData = data.filter(
    (user) => String(user.id) !== String(userId)
  );
  await writeData(path, filteredData);
}

async function updateData(userId, newData, path) {
  const users = await readData(path);
  const index = users.findIndex((user) => String(user.id) === String(userId));
  users[index] = { userId, ...newData };
  await writeFile(path, JSON.stringify(users));
}
module.exports = { readData, addUser, writeData, deleteData, updateData };
