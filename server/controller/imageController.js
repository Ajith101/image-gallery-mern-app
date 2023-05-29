const cloudinary = require("cloudinary").v2;
const imageModel = require("../models/imageModel");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// get all imagePost
const getAllPOst = async (req, res) => {
  const allPost = await imageModel.find();
  try {
    if (allPost) {
      return res.status(200).json(allPost);
    }
  } catch (error) {
    return res.status(404).json({ message: "something went wrong" });
  }
};

// post new image
const addNewPost = (req, res) => {
  const { name } = req.files.photos;
  try {
    const file = req.files.photos;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      const newPost = new imageModel({
        fileName: name,
        img_url: result.url,
        added_on: new Date().toDateString(),
      });
      await newPost.save();
      const getAllposts = await imageModel.find();
      return res.status(200).json(getAllposts);
    });
  } catch (error) {
    return res.status(400).json("Something went wrong");
  }
};

module.exports = { getAllPOst, addNewPost };
