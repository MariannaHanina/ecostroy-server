const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.content = require("./content.model.js")(mongoose);
db.menu = require("./menu.model.js")(mongoose);
db.slogans = require("./slogans.model.js")(mongoose);
db.services = require("./services.model.js")(mongoose);
db.articles = require("./articles.model.js")(mongoose);
db.projects = require("./projects.model.js")(mongoose);
db.video = require("./video.model.js")(mongoose);
db.galleries = require("./galleries.model.js")(mongoose);

// admin part
db.roles = require("./roles.model.js")(mongoose);
db.users = require("./users.model.js")(mongoose);
db.units = require("./units.model.js")(mongoose);
db.materialCategories = require("./materialCategories.model.js")(mongoose);
db.materials = require("./materials.model.js")(mongoose);
db.workCategories = require("./workCategories.model.js")(mongoose);
db.works = require("./works.model.js")(mongoose);
db.sets = require("./sets.model.js")(mongoose);

db.USER_ROLES = ["user", "admin", "moderator"];

module.exports = db;
