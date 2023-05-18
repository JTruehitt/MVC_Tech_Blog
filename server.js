const express = require("express");
const sequelize = require("./config/connection");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3018;

const router = require('./controllers/index')
// //! imported models so tables would be synced. check to see if this is needed once routes are established
// const Models = require('./models')

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

// initializing and setting hbs as the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

// express middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting connection to public folder
app.use(express.static(path.join(__dirname, "public")));

// using our defined controller routes
app.use(router);


// Middleware to test connection
app.use((req, res) => {
  res.render('404');
});

// attempting connection to db prior to starting server
(async () => {
  try {
    await sequelize.sync({ force: false });
    // Setting the server to listen on the selected PORT and return a confirmation.
    app.listen(PORT, () => {
      console.log(
        `Server listening on port ${PORT} at http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  }
})();
