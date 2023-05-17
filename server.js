const express = require("express");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3018;

// express middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting connection to public folder
app.use(express.static("public"));

// Middleware to test connection
app.use((req, res) => {
  res.send("Testing");
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    app.listen(PORT, () => {
      console.log(
        `Server listening on port ${PORT} at http://localhost:${PORT}`
      );
    });
  } catch (err) {
    console.log(`Error connecting to the database: ${err}`);
  }
  // Setting the server to listen on the selected PORT and return a confirmation.
})();
