const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const images = require("./routes/imageRoutes");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3020;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/images", images);

mongoose
  .connect(process.env.DB_URL, {
    UseUnifiedTopology: true,
    UseNewUrlParser: true,
  })
  .then(
    app.listen(process.env.PORT, () => {
      console.log(`connected mongo db with ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
