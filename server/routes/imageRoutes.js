const express = require("express");
const { getAllPOst, addNewPost } = require("../controller/imageController");
const router = express.Router();

router.get("/", getAllPOst);
router.post("/", addNewPost);

module.exports = router;
