module.exports = app => {
  const sets = require("../controllers/sets.controller.js");

  var router = require("express").Router();

  // Create a new Set
  router.post("/", sets.create);

  // Retrieve all Sets
  router.get("/", sets.findAll);

  // Update a Set with id
  router.put("/:id", sets.update);

  // Delete a Set with id
  router.delete("/:id", sets.delete);

  app.use('/api/sets', router);
}
