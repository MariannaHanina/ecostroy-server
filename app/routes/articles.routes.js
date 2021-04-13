module.exports = app => {
  const articles = require("../controllers/articles.controller.js");

  var router = require("express").Router();

  // Create a new Article
  router.post("/", articles.create);

  // Retrieve all Articles
  router.get("/", articles.findAll);

  // Retrieve Article for type
  router.get("/type/:type", articles.findType);

  app.use('/api/articles', router);
}
