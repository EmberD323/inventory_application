const pool = require("./pool");
async function getAllAuthors() {
    const { rows } = await pool.query("SELECT * FROM authors");
    return rows;
}
async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function getAllBooks() {
    const { rows } = await pool.query("SELECT * FROM books");
    return rows;
}

  module.exports ={getAllAuthors,
    getAllGenres,
    getAllBooks
  }