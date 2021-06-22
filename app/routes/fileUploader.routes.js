const { upload } = require("../middlewares");
const path = require('path');
const fs = require('fs')
const router = require("express").Router();
const FileType = require('file-type');

module.exports = app => {
  // Upload file
  router.post("/upload", upload.single('file'), (req, res) => {
    res.json({ file: req.file });
  });

  // Upload file for entity
  router.post("/upload/:entity", upload.single('file'), (req, res) => {
    res.json({ file: req.file });
  });

  router.get("/:subpath/:filename", async (req, res) => {
    const filePath = path.join('./uploads', req.params.subpath, req.params.filename);
    const fileType = await FileType.fromFile(filePath);
    res.writeHead(200,{'content-type': fileType.mime});
    fs.createReadStream(filePath).pipe(res);
  });

  app.use('/api/files', router);
}
