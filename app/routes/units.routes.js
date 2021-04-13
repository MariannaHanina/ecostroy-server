module.exports = app => {
  const units = require("../controllers/units.controller.js");

  var router = require("express").Router();

  // Create a new Unit
  router.post("/", units.create);

  // Retrieve all Units
  router.get("/", units.findAll);

  app.use('/api/units', router);
}
