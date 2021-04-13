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
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  })

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ecostroy server application."});
});

require("./app/routes/content.routes.js")(app);
require("./app/routes/menu.routes.js")(app);
require("./app/routes/slogans.routes.js")(app);
require("./app/routes/services.routes.js")(app);
require("./app/routes/articles.routes.js")(app);
require("./app/routes/projects.routes.js")(app);
require("./app/routes/video.routes.js")(app);
require("./app/routes/galleries.routes.js")(app);

require("./app/routes/units.routes.js")(app);
require("./app/routes/materialCategories.routes.js")(app);
require("./app/routes/materials.routes.js")(app);
require("./app/routes/workCategories.routes.js")(app);
require("./app/routes/works.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
