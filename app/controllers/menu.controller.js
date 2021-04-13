const db = require("../models");
const Menu = db.menu;

// Create and Save a new menu item
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.path) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Menu Item
  const data = {
    title: req.body.title,
    path: req.body.path
  };

  if (req.body.items.length) {
    data.items = req.body.items;
  }

  const menu = new Menu(data);

  // Save Menu Item in the database
  try {
    const data = await menu.save(menu);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred white creating the Menu item."
    });
  }
};

// Retrieve Menu from the database.
exports.findAll = async (req, res) => {
  try {
    const data = await Menu.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Menu."
    });
  }
};

// Update all Menu Items.
exports.updateAll = async (req, res) => {
  if (!req.body.length) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  try {
    req.body.forEach(async item => {
      const itemData = await Menu.findByIdAndUpdate(
        item._id,
        item,
        { useFindAndModify: false }
      );

      if (!itemData) {
        res.status(404).send({
          message: `Cannot update Menu item with id=${id}. Maybe Menu item was not found!`
        });
      }
    });

    const data = await Menu.find();
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message: "Error updating Menu"
    });
  }
}
