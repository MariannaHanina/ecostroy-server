const db = require("../models");
const Projects = db.projects;

// Create and Save a new project
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Project
  const project = new Projects({
    type: req.body.type,
    title: req.body.title,
    image: req.body.image,
    area: req.body.area,
    size: req.body.size,
    floors: req.body.floors,
    price: req.body.price,
    description: req.body.description,
    base_sets_description: req.body.base_sets_description,
    additional_sets_description: req.body.additional_sets_description,
    request_description: req.body.request_description,
    images: req.body.images
  });

  // Save Project in the database
  try {
    const data = await project.save(project);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Project."
    });
  }
};

// Retrieve all projects from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Projects.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Projects."
    });
  }
};

// Find a single Project with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Projects.find({ _id: id});
    if (!data)
      res.status(404).send({ message: "Not found Project with id " + id });
    else res.send(data[0]);
  } catch(err) {
    res
      .status(500)
      .send({ message: "Error retrieving Project with id=" + id });
  }
};
