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

app.get("/blog", async (req, res) => {
  const blog = await Blog.find(); // return array and do not give same variable names i.e blog = Blog
  res.status(200).json({
    msg: "Welcome to Blog page...",
    data: blog,
  });
});

app.post("/blog", upload.single("image"), async (req, res) => {
  const { game, player, add } = req.body;
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

app.get("/blog/:id", async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(400).json({
      // object
      msg: "no data found",
    });
  }
  res.status(200).json({
    msg: "Fetched data successfully..",
    data: blog,
  });
});

app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  res.status(200).json({
    msg: "Blog delete successfully...",
  });
});

app.use(express.static("./storage")); // give permission to acces storage data

app.listen(process.env.PORT, () => {
  console.log("Your Project has been started....");
});
