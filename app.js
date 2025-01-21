require("dotenv").config();
const express = require("express");
const connectDatabase = require("./database");
const Blog = require("./model/blogModel");
const { storage, multer } = require("./middleware/multerConfig");
const upload = multer({ storage: storage });
const app = express();

app.use(express.json());
connectDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to Express Project...");
});

app.get("/blog", (req, res) => {
  res.send("Welcome to blog page..");
});

app.post("/blog", upload.single("image"), async (req, res) => {
  const { game, player, add, image } = req.body;
  const filename = req.file.filename;
  if (!game || !player || !add) {
    return res.status(400).json({
      msg: "Please provide all data...",
    });
  }
  await Blog.create({
    game: game,
    player: player,
    add: add,
    image: filename,
  });

  res.send("Blog API Hit successfully");
});

app.listen(process.env.PORT, () => {
  console.log("Your Project has been started....");
});
