module.exports = app => {
  const video = require("../controllers/video.controller.js");

  var router = require("express").Router();

  // Create a new Video
  router.post("/", video.create);

  // Retrieve all Video
  router.get("/", video.findAll);

  app.use('/api/video', router);
}
