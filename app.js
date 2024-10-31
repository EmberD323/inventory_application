require("dotenv").config();
const path = require("node:path");

const express = require("express");
const app = express();

const router = require("./routes/router");
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
