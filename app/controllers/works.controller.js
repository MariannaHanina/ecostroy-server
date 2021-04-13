const db = require("../models");
const Works = db.works;

// Create and Save a new Work
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Work
  const work = new Works({
    name: req.body.name,
    category: req.body.category._id,
    unit: req.body.unit._id,
    price: req.body.price,
    conversionUnit: req.body.conversionUnit._id,
    conversionRate: req.body.conversionRate,
    salary: req.body.salary
  });

  // Save Work in the database
  try{
    let data = await work.save(work);
    await data
      .populate('category')
      .populate('unit')
      .populate('conversionUnit')
      .execPopulate();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Work."
    });
  }
};

// Retrieve all Works from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Works.find()
      .populate('category')
      .populate('unit')
      .populate('conversionUnit');

    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Works."
    });
  }
};

// Delete a Work with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Works.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send({
        message: `Cannot delete Work with id=${id}. Maybe Material was not found!`
      });
    } else {
      res.send({
        message: "Work was deleted successfully!"
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete Work with id=" + id
    });
  }
};
