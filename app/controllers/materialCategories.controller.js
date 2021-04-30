const db = require("../models");
const MaterialCategories = db.materialCategories;

// Create and Save a new Material Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.parent) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Material Category
  const materialCategory = new MaterialCategories({
    name: req.body.name,
    parent: req.body.parent
  });

  // Save Material Category in the database
  try {
    const data = await materialCategory.save(materialCategory);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Material Category."
    });
  }
};

// Retrieve all Material Categories from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await MaterialCategories.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Material categories."
    });
  }
};

// Delete a Material Category with the specified id in the request
// and Subcategories for this category
exports.delete = async (req, res) => {

  async function findAndDeleteSubItems(id) {
    try {
      const subcategoriesData = await MaterialCategories.find({parent: id});
      console.log('subcategoriesData', subcategoriesData);

      if (!subcategoriesData.length) return;

      subcategoriesData.forEach(async (item, i) => {
        await MaterialCategories.findByIdAndRemove(item._id, { useFindAndModify: false });
        await findAndDeleteSubItems(item._id);
      });
    } catch(err) {
      console.log(err);
    }
  }

  const id = req.params.id;

  try {

    await findAndDeleteSubItems(id);
    const data = await MaterialCategories.findByIdAndRemove(id, { useFindAndModify: false });

    if (!data) {
      res.status(404).send({
        message: `Cannot delete Material category with id=${id}. Maybe Material category was not found!`
      });
    } else {
      res.send({
        message: "Material category was deleted successfully!"
      });
    }
  } catch(err) {
    res.status(500).send({
      message: "Could not delete Material category with id=" + id
    });
  }
};
