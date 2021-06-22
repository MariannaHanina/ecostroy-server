const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8080", "http://192.168.1.114:8080"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Roles = db.roles;

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    initial();
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

function initial() {
  Roles.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Roles({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Roles({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Roles({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ecostroy server application."});
});

require("./app/routes/fileUploader.routes.js")(app);
require("./app/routes/content.routes.js")(app);
require("./app/routes/menu.routes.js")(app);
require("./app/routes/slogans.routes.js")(app);
require("./app/routes/services.routes.js")(app);
require("./app/routes/articles.routes.js")(app);
require("./app/routes/projects.routes.js")(app);
require("./app/routes/video.routes.js")(app);
require("./app/routes/galleries.routes.js")(app);

require('./app/routes/auth.routes.js')(app);
require("./app/routes/units.routes.js")(app);
require("./app/routes/materialCategories.routes.js")(app);
require("./app/routes/materials.routes.js")(app);
require("./app/routes/workCategories.routes.js")(app);
require("./app/routes/works.routes.js")(app);
require("./app/routes/sets.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
