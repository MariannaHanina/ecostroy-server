const db = require("../models");
const Video = db.video;

// Create and Save a new video
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.type || !req.body.video) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Video
  const video = new Video({
    type: req.body.type,
    video: req.body.video,
    title: req.body.title,
    text: req.body.text
  });

  // Save Video in the database
  try {
    const data = await video.save(video);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Video."
    });
  }
};

// Retrieve all video from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Video.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Video."
    });
  }
};
