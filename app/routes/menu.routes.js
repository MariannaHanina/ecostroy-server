module.exports = app => {
  const menu = require("../controllers/menu.controller.js");

  var router = require("express").Router();

  // Create a new Menu item
  router.post("/", menu.create);

  // Retrieve all Menu items
  router.get("/", menu.findAll);

  // Update all Menu items
  router.put("/", menu.updateAll);

  app.use('/api/menu', router);
}
