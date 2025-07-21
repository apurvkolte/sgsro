const multer = require('multer');
const fs = require("fs");

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    console.log("555");

    if (!fs.existsSync("./public/uploads/users")) {
      fs.mkdirSync("./public/uploads/users")
    }
    cb(null, './public/uploads/users');
  },
  filename: function (req, file, cb) {
    console.log("5552");

    cb(null, new Date().toISOString().replace(/:/g, '-') + " " + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("5551");

  // reject a file
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});
