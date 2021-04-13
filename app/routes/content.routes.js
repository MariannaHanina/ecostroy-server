module.exports = app => {
  const content = require("../controllers/content.controller.js");

  var router = require("express").Router();

  // Create a new Content
  router.post("/", content.create);

  // Retrieve a single Content for entity
  router.get("/:entity", content.findEntity);

  // Update a Content with id
  router.put("/:id", content.update);

  app.use('/api/content', router);
}
