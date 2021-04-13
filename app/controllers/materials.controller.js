const db = require("../models");
const Materials = db.materials;

// Create and Save a new Material
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Material
  const material = new Materials({
    name: req.body.name,
    category: req.body.category._id,
    unit: req.body.unit._id,
    price: req.body.price,
    conversionUnit: req.body.conversionUnit._id,
    conversionRate: req.body.conversionRate
  });

  // Save Material in the database
  try{
    let data = await material.save(material);
    await data
      .populate('category')
      .populate('unit')
      .populate('conversionUnit')
      .execPopulate();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Material."
    });
  }
};

// Retrieve all Materials from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Materials.find()
      .populate('category')
      .populate('unit')
      .populate('conversionUnit');

    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Material."
    });
  }
};

// Update a Material by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  console.log(req.body);

  try {
    const data = await Materials.findByIdAndUpdate(
      id,
      req.body,
      { useFindAndModify: false }
    );
    if (!data) {
      res.status(404).send({
        message: `Cannot update Material with id=${id}. Maybe Material was not found!`
      });
    } else res.send({ message: "Material was updated successfully." });
  } catch(err) {
    console.log(err);
    res.status(500).send({
      message: "Error updating Material with id=" + id
    });
  }
};

// Delete a Material with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Materials.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send({
        message: `Cannot delete Material with id=${id}. Maybe Material was not found!`
      });
    } else {
      res.send({
        message: "Material was deleted successfully!"
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete Material with id=" + id
    });
  }
};
