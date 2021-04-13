module.exports = app => {
  const workCategories = require("../controllers/workCategories.controller.js");

  var router = require("express").Router();

  // Create a new Work Category
  router.post("/", workCategories.create);

  // Retrieve all Work Categories
  router.get("/", workCategories.findAll);

  app.use('/api/workCategories', router);
}
