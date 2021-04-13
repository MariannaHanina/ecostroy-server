module.exports = app => {
  const materialCategories = require("../controllers/materialCategories.controller.js");

  var router = require("express").Router();

  // Create a new Material Category
  router.post("/", materialCategories.create);

  // Retrieve all Material Categories
  router.get("/", materialCategories.findAll);

  app.use('/api/materialCategories', router);
}
