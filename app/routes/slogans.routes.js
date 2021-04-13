module.exports = app => {
  const slogans = require("../controllers/slogans.controller.js");

  var router = require("express").Router();

  // Create a new Slogan
  router.post("/", slogans.create);

  // Retrieve all Slogans
  router.get("/", slogans.findAll);

  app.use('/api/slogans', router);
}
