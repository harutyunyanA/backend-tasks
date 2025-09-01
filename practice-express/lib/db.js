const { readFile, writeFile } = require("fs/promises");

async function readData(path) {
  const content = await readFile(path, "utf-8");
  if (!content) {
    return [];
  }
  return JSON.parse(content);
}

async function saveData(data, path) {
  const content = await readData(path);
  content.push(data);

  await writeFile(path, JSON.stringify(content));
}

module.exports = { readData, saveData };
