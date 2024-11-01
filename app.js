require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();

const router = require("./routes/router");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use("/", router);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
