const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  game: {
    type: String,
  },
  player: {
    type: String,
  },
  add: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
