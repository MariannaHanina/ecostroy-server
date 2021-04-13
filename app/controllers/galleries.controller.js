const db = require("../models");
const Galleries = db.galleries;

// Create and Save a new gallery
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Gallery
  const gallery = new Galleries({
    title: req.body.title,
    text: req.body.text,
    image: req.body.image,
    images: req.body.images
  });

  // Save Gallery in the database
  try {
    const data = await gallery.save(gallery);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Gallery."
    });
  }
};

// Retrieve all galleries from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Galleries.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Galleries."
    });
  }
};
