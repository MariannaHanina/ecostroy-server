const db = require("../models");
const Content = db.content;

// Create and Save a new Content
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.entity || !req.body.content) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a content
  const content = new Content({
    entity: req.body.entity,
    content: req.body.content
  });

  // Save Content in the database
  try {
    const data = await content.save(content);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Content."
    });
  }
};

// Find a single Content for entity
exports.findEntity = async (req, res) => {
  const entity = req.params.entity;

  try {
    const data = await Content.find({ entity: entity});
    if (!data)
      res.status(404).send({ message: "Not found Content for entity " + entity });
    else res.send(data[0]);
  } catch(err) {
    res
      .status(500)
      .send({ message: "Error retrieving Content for entity=" + entity });
  }
};

// Update a Content by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  try {
    const data = await Content.findByIdAndUpdate(
      id,
      req.body,
      { useFindAndModify: false }
    );
    if (!data) {
      res.status(404).send({
        message: `Cannot update Content with id=${id}. Maybe Content was not found!`
      });
    } else res.send({ message: "Content was updated successfully." });
  } catch(err) {
    res.status(500).send({
      message: "Error updating Content with id=" + id
    });
  }
};
