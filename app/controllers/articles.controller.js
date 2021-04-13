const db = require("../models");
const Articles = db.articles;

// Create and Save a new article
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Article
  const article = new Articles({
    type: req.body.type,
    title: req.body.title,
    intro: req.body.intro,
    text: req.body.text,
    button: {
      text: req.body.button.text
    },
    video: req.body.video,
    image: req.body.image,
    content: req.body.content
  });

  // Save Article in the database
  try {
    const data = await article.save(article);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred white creating the Article."
    });
  }
};

// Retrieve all articles from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Articles.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Articles."
    });
  }
};

// Find a single Articles with type
exports.findType = async (req, res) => {
  const type = req.params.type;

  try {
    const data = await Articles.find({ type: type});
    if (!data)
      res.status(404).send({ message: "Not found Articles for type " + type });
    else res.send(data);
  } catch(err) {
    res
      .status(500)
      .send({ message: "Error retrieving Articles for type=" + type });
  }
};
