// call all the required packages
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const fs = require("fs");
const { renameFile_Upload_By_Req } = require("./function");
var path = require("path");

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//ROUTES WILL GO HERE
app.get("/", function (req, res) {
  res.json({ message: "WELCOME" });
});

// SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

const upload = multer({ dest: "./public/uploads/" });

// ROUTES
app.get("/upload", (req, res) => {
  res.send("UpFile");
});
app.post("/upload", upload.single("file"), (req, res, err) => {
  console.log(req.file);
  console.log(renameFile_Upload_By_Req(req));
  res.send("UpFile");
});

app.listen(4444, () =>
  console.log("Server started on port http://localhost:4444")
);
