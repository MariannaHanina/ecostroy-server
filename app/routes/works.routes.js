module.exports = app => {
  const works = require("../controllers/works.controller.js");

  var router = require("express").Router();

  // Create a new Work
  router.post("/", works.create);

  // Retrieve all Works
  router.get("/", works.findAll);

  // Delete a Work with id
  router.delete("/:id", works.delete);

  app.use('/api/works', router);
}
