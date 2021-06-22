const db = require("../models");
const Sets = db.sets;

// Create and Save a new Set
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Set
  const set = new Sets({
    name: req.body.name,
    sale: req.body.sale,
    descriptionForSite: req.body.descriptionForSite,
    imagesForSite: req.body.imagesForSite || [],
    videoForSite: req.body.videoForSite,
    descriptionForAdmin: req.body.descriptionForAdmin,
    imagesForAdmin: req.body.imagesForAdmin || [],
    works: (req.body.works && req.body.works.length) ? req.body.works.map(w => w._id) : []
  });

  let data;
  // Save Set in the database
  try{
     data = await set.save(set);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Set."
    });
  }

  try {
    await data
    .populate({
      path: 'works',
      model: 'works',
      populate: {
        path: 'category',
        model: 'workCategories'

      }
    });
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving the Set."
    });
  }
};

// Retrieve all Sets from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Sets.find()
      .populate({
        path: 'works',
        model: 'works',
        populate: {
          path: 'category',
          model: 'workCategories'

        }
      });

    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Sets."
    });
  }
};

// Update a Set by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  try {
    const data = await Sets.findByIdAndUpdate(
      id,
      req.body,
      { useFindAndModify: false }
    );
    if (!data) {
      res.status(404).send({
        message: `Cannot update Set with id=${id}. Maybe Set was not found!`
      });
    } else res.send({ message: "Set was updated successfully." });
  } catch(err) {
    res.status(500).send({
      message: "Error updating Set with id=" + id
    });
  }
};

// Delete a Set with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Sets.findByIdAndRemove(id);

    if (!data) {
      res.status(404).send({
        message: `Cannot delete Set with id=${id}. Maybe Set was not found!`
      });
    } else {
      res.send({
        message: "Set was deleted successfully!"
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete Set with id=" + id
    });
  }
};
