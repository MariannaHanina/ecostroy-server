const db = require("../models");
const MaterialCategories = db.materialCategories;

// Create and Save a new Material Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.parent) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Material Category
  const materialCategory = new MaterialCategories({
    name: req.body.name,
    parent: req.body.parent
  });

  // Save Material Category in the database
  try {
    const data = await materialCategory.save(materialCategory);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Material Category."
    });
  }
};

// Retrieve all Material Categories from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await MaterialCategories.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Material categories."
    });
  }
};
