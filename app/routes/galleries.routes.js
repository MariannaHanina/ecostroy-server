module.exports = app => {
  const galleries = require("../controllers/galleries.controller.js");

  var router = require("express").Router();

  // Create a new Gallery
  router.post("/", galleries.create);

  // Retrieve all Galleries
  router.get("/", galleries.findAll);

  app.use('/api/galleries', router);
}
