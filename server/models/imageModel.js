const mongoose = require("mongoose");

const ImageScheema = new mongoose.Schema({
  fileName: { type: String },
  added_on: { type: Date, default: new Date() },
  img_url: String,
});

const imageModels = mongoose.model("images", ImageScheema);

module.exports = imageModels;
