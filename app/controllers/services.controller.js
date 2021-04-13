const db = require("../models");
const Service = db.services;

// Create and Save a new service
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Service
  const service = new Service({
    type: req.body.type,
    title: req.body.title,
    intro: req.body.intro,
    text: req.body.text,
    image: req.body.image,
    content: req.body.content,
    button: {
      text: req.body.button.text
    }
  });

  // Save Service in the database
  try {
    const data = await service.save(service);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Service."
    });
  }
};

// Retrieve all services from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Service.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Service."
    });
  }
};
