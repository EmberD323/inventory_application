const db = require("../db/queries");

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}
async function searchAuthorGet (req, res) {
    const author = req.query.author
    const books = await db.getBooksByAuthor(author.toLowerCase())
    if(isEmpty(books)){
      res.render("emptySearch", {searchTerm:author})
    }else{
      res.render("bookList", {
        title: books[0].author_name,
        books:books
      });
    }
}
async function searchTitleGet (req, res) {
  const title = req.query.title
  const books = await db.getBooksByTitle(title.toLowerCase())
  if(isEmpty(books)){
    res.render("emptySearch", {searchTerm:title})
  }else{
    res.render("bookList", {
      title: books[0].author_name,
      books:books
    });
  }
  
}
module.exports = {
  searchAuthorGet,
  searchTitleGet
};