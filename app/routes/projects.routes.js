module.exports = app => {
  const projects = require("../controllers/projects.controller.js");

  var router = require("express").Router();

  // Create a new Project
  router.post("/", projects.create);

  // Retrieve all Projects
  router.get("/", projects.findAll);

  // Retrieve a Project with id
  router.get("/:id", projects.findOne);

  app.use('/api/projects', router);
}
