module.exports = app => {
  const materials = require("../controllers/materials.controller.js");

  var router = require("express").Router();

  // Create a new Material
  router.post("/", materials.create);

  // Retrieve all Materials
  router.get("/", materials.findAll);

  // Update a Material with id
  router.put("/:id", materials.update);

  // Delete a Material with id
  router.delete("/:id", materials.delete);

  app.use('/api/materials', router);
}
