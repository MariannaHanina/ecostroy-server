module.exports = app => {
  const materialCategories = require("../controllers/materialCategories.controller.js");

  var router = require("express").Router();

  // Create a new Material Category
  router.post("/", materialCategories.create);

  // Retrieve all Material Categories
  router.get("/", materialCategories.findAll);

  // Delete a Material Category with id
  router.delete("/:id", materialCategories.delete);

  app.use('/api/materialCategories', router);
}
