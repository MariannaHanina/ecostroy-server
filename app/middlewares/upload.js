const path = require('path');
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subpath = req.params.entity ? `/${req.params.entity}` : "";
    cb(null, path.join('./uploads', subpath));
  }
});

const upload = multer({
  storage
});

module.exports = upload;
