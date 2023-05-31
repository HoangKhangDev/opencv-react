const fs = require("fs");
const renameFile_Upload = (filename, properties) => {
  fs.rename(
    `./public/uploads/${filename}`,
    `./public/uploads/${filename}.${properties}`,
    function (err) {
      if (err) console.log("ERROR: " + err);
    }
  );
};

const renameFile_Upload_By_Req = (req) => {
  fs.rename(
    `./public/uploads/${req.file.filename}`,
    `./public/uploads/${req.file.filename}.${req.file.mimetype.split("/")[1]}`,
    function (err) {
      if (err) console.log("ERROR: " + err);
    }
  );
  return `localhost:4444/uploads/${req.file.filename}.${req.file.mimetype.split("/")[1]}`;
};

module.exports = { renameFile_Upload, renameFile_Upload_By_Req };
