require("dotenv").config();
const db = require("./db/queries");
const path = require("node:path");
const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

async function getAuthors() {
    const authors = await db.getAllAuthors();
    console.log("Authors: ", authors);
}
async function getGenres() {
    const genres = await db.getAllGenres();
    console.log("Genres: ", genres);
}
async function getBooks() {
    const books = await db.getAllBooks();
    console.log("Books: ", books);
}

getAuthors();
getGenres();
getBooks();


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
