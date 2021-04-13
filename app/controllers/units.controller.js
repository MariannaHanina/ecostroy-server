const db = require("../models");
const Unit = db.units;

// Create and Save a new unit
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.value || !req.body.label) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Unit
  const unit = new Unit({
    value: req.body.value,
    label: req.body.label
  });

  // Save Unit in the database
  try {
    const data = await unit.save(unit);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Unit."
    });
  }
};

// Retrieve all units from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Unit.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Units."
    });
  }
};
