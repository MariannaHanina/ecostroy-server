const db = require("../models");
const Slogan = db.slogans;

// Create and Save a new slogan
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.mainText) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Slogan
  const slogan = new Slogan({
    type: req.body.type,
    mainText: req.body.mainText,
    subText: req.body.subText,
    buttonText: req.body.buttonText
  });

  // Save Slogan in the database
  try {
    const data = await slogan.save(slogan);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Slogan."
    });
  }
};

// Retrieve all slogans from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Slogan.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Slogans."
    });
  }
};
