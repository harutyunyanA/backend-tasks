const path = require("path");
const fs = require("fs/promises");

if (process.argv[2] === "create") {
  create();
} else if (process.argv[2] === "organize") {
  organize();
}

async function create() {
  const fileExtensions = [
    ".txt",
    ".docx",
    ".pdf",
    ".xlsx",
    ".pptx",
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".svg",
    ".mp3",
    ".wav",
    ".mp4",
    ".avi",
    ".mkv",
    ".zip",
    ".rar",
    ".7z",
  ];

  const folder = path.join(__dirname, "test");
  await fs.mkdir(folder);
  for (let i = 0; i < 150; i++) {
    let randomExtension = Math.floor(Math.random() * fileExtensions.length);
    let fileName = `${i}${fileExtensions[randomExtension]}`;
    let filePath = path.join(folder, fileName);
    await fs.writeFile(filePath, "");
  }
  console.log("created 150 files");
}

async function organize() {
  await fs.mkdir("./result");

  const files = await fs.readdir("./test/");
  const setOfDirs = new Set();
  for (let i = 0; i < files.length; i++) {
    let ext = path.extname(files[i]).slice(1);
    if (!setOfDirs.has(ext)) {
      await fs.mkdir(`./result/${ext}`);
      setOfDirs.add(ext);
    }
    await fs.rename(`./test/${files[i]}`, `./result/${ext}/${files[i]}`);
  }
}
