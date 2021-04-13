const db = require("../models");
const WorkCategories = db.workCategories;

// Create and Save a new Work Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.parent) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Work Category
  const workCategory = new WorkCategories({
    name: req.body.name,
    parent: req.body.parent
  });

  // Save Work Category in the database
  try {
    const data = await workCategory.save(workCategory);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Work Category."
    });
  }
};

// Retrieve all Work Categories from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await WorkCategories.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Work categories."
    });
  }
};
