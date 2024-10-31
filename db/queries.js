const pool = require("./pool");
async function getAllAuthors() {
    const { rows } = await pool.query("SELECT * FROM authors");
    return rows;
}
async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function getBooksByGenre(genreid) {
    const { rows } = await pool.query("SELECT * FROM books JOIN authors ON (authorid = authors.id ) WHERE genreid = $1",[genreid]);
    return rows;
}

async function getGenre(genreid) {
  const { rows } = await pool.query("SELECT * FROM genres WHERE id = $1",[genreid]);


  return rows[0].genre_name;
}


async function getBooksByAuthor(author) {
  let searchString = '%' + author + '%';
    const { rows } = await pool.query("SELECT * FROM books JOIN authors ON (authorid = authors.id ) WHERE author_name Like $1",[searchString]);
    return rows;
}

async function getBookByID(id) {
    const { rows } = await pool.query("SELECT * FROM books JOIN authors ON (authorid = authors.id ) WHERE books.id = $1",[id]);


    return rows[0];
}
async function getBooksByTitle(title) {
  let searchString = '%' + title + '%';
    const { rows } = await pool.query("SELECT * FROM books JOIN authors ON (authorid = authors.id ) WHERE name Like $1",[searchString]);
    return rows;
}
async function addBook({name,author,genre}) {

  //check if author exisits
  const authorSearch = await pool.query("SELECT * FROM authors WHERE author_name = $1",[author]);
  if(authorSearch.rows[0]==undefined){
    await pool.query("INSERT INTO authors (author_name) VALUES ($1)",[author]);
  }
  //check if book exists
  const bookSearch = await pool.query("SELECT * FROM books WHERE name = $1",[name]);
  if(bookSearch.rows[0]==undefined){
    await pool.query("INSERT INTO books (name,authorid,genreid) VALUES ($1,(SELECT id from authors where author_name = $2),(SELECT id from genres where genre_name = $3))",
      [name,author,genre]);
  }
  return
}

async function addGenre(genre) {
  //check if genre exisits
  
  const genreSearch = await pool.query("SELECT * FROM genres WHERE genre_name = $1",[genre]);
  if(genreSearch.rows[0]==undefined){
    await pool.query("INSERT INTO genres (genre_name) VALUES ($1)",[genre]);
  }
  return
}
async function addAuthor(author) {
  //check if genre exisits
  const authorSearch = await pool.query("SELECT * FROM authors WHERE author_name = $1",[author]);
  if(authorSearch.rows[0]==undefined){
    await pool.query("INSERT INTO authors (author_name) VALUES ($1)",[author]);
  }
  return
}
async function updateGenre(genreid,genre) {
  await pool.query("UPDATE genres SET genre_name= $1 WHERE id=$2",[genre,genreid]);


  return
}

async function updateBook(bookid,name,author,genre) {
  //check if author exisits
  const authorSearch = await pool.query("SELECT * FROM authors WHERE author_name = $1",[author]);
  if(authorSearch.rows[0]==undefined){
    await pool.query("INSERT INTO authors (author_name) VALUES ($1)",[author]);
  }
  await pool.query("UPDATE books SET name= $3, authorid=(SELECT id FROM authors where author_name = $2), genreid=(SELECT id FROM genres where genre_name = $4) WHERE id=$1",
    [bookid,author,name,genre]);

  
}

async function deleteGenre(genreid) {
  await pool.query("DELETE FROM genres WHERE id=$1",
    [genreid]);

}

async function deleteBook(bookid) {
  await pool.query("DELETE FROM books WHERE id=$1",
    [bookid]);
}


  module.exports ={getAllAuthors,
    getAllGenres,
    getBooksByGenre,
    getGenre,
    getBooksByAuthor,
    getBooksByTitle,
    getBookByID,
    addBook,
    addGenre,
    addAuthor,
    updateGenre,
    updateBook,
    deleteGenre,
    deleteBook
  }