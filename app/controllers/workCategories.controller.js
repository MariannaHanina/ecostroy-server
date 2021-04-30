const db = require("../models");
const WorkCategories = db.workCategories;

// Create and Save a new Work Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.parent) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Work Category
  const workCategory = new WorkCategories({
    name: req.body.name,
    parent: req.body.parent
  });

  // Save Work Category in the database
  try {
    const data = await workCategory.save(workCategory);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Work Category."
    });
  }
};

// Retrieve all Work Categories from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await WorkCategories.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Work categories."
    });
  }
};

// Delete a Work Category with the specified id in the request
// and Subcategories for this category
exports.delete = async (req, res) => {

  async function findAndDeleteSubItems(id) {
    try {
      const subcategoriesData = await WorkCategories.find({parent: id});
      console.log('subcategoriesData', subcategoriesData);

      if (!subcategoriesData.length) return;

      subcategoriesData.forEach(async (item, i) => {
        await WorkCategories.findByIdAndRemove(item._id, { useFindAndModify: false });
        await findAndDeleteSubItems(item._id);
      });
    } catch(err) {
      console.log(err);
    }
  }

  const id = req.params.id;

  try {

    await findAndDeleteSubItems(id);
    const data = await WorkCategories.findByIdAndRemove(id, { useFindAndModify: false });

    if (!data) {
      res.status(404).send({
        message: `Cannot delete Work Category with id=${id}. Maybe Work Category was not found!`
      });
    } else {
      res.send({
        message: "Work Category was deleted successfully!"
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete Work Category with id=" + id
    });
  }
};
