const db = require("../db/queries");

const { body, validationResult } = require("express-validator");

const validateGenre= [
  body("genre").exists({ values: "falsy" })
    .trim()
    .toLowerCase()
    .isLength({ min: 1, max: 30 }).withMessage(`Genre name must be between 1 and 30 characters.`)
];
const validateAuthor= [
  body("author").exists({ values: "falsy" })
    .trim()
    .toLowerCase()
    .isLength({ min: 1, max: 50 }).withMessage(`Name must be between 1 and 50 characters.`)
];
const validateBook= [
  validateAuthor,
  body("name").exists({ values: "falsy" })
    .trim()
    .toLowerCase()
    .isLength({ min: 1, max: 50 }).withMessage(`Title must be between 1 and 50 characters.`),
];


async function bookListGet (req, res) {
    let genreid = req.params.genreid
    const genre = await db.getGenre(genreid);
    const books = await db.getBooksByGenre(genreid);
    res.render("bookList", {
        title: genre,
        books:books
      });
}

async function bookAddGet (req, res) {
  const genres = await db.getAllGenres();
  res.render("addBook", {
    title: "Add a book",
    genres:genres
  });
}
bookAddPost =[
  validateBook,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addBook", {
        title: "Add a book",
        errors: errors.array(),
      });
    }
    
    const {name,author,genre} = req.body;
    await db.addBook({name,author,genre});
    res.redirect("/");
  }
]

async function genreAddGet (req, res) {
  res.render("addGenre", {
    title: "Add a genre",
  });
}
genreAddPost = [
  validateGenre,
  async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addGenre", {
        title: "Add a genre",
        errors: errors.array(),
      });
    }
    const {genre} = req.body;
    await db.addGenre(genre);
    console.log("Genre added");
    res.redirect("/");
  }
] 
async function authorAddGet (req, res) {
  res.render("addAuthor", {
    title: "Add an author",
  });
}
authorAddPost = [
  validateAuthor,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("addAuthor", {
        title: "Add an author",
        errors: errors.array(),
      });
    }
    const {author} = req.body;
    await db.addAuthor(author);
    console.log("Author added");
    res.redirect("/");
  }
]

async function genreUpdateGet (req, res) {
  let genreid = req.params.genreid
  const genre = await db.getGenre(genreid);
  res.render("updateGenre", {
    title: "Edit genre name",
    genreid:genreid,
    genre_name:genre
  });
}
genreUpdatePost = [
  validateGenre,
  async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let genreid = req.params.genreid
      const genre = await db.getGenre(genreid);
      return res.status(400).render("updateGenre", {
        title: "Edit genre name",
        genreid:genreid,
        genre_name:genre,
        errors: errors.array(),
      });
    }
    const genre = req.body.genre
    await db.updateGenre(req.params.genreid,genre)
    res.redirect("/");
  }
]

async function bookUpdateGet (req, res) {
  const genres = await db.getAllGenres();
  const bookid = req.params.bookid;
  const book = await db.getBookByID(bookid);
  res.render("updateBook", {
    title: "Edit book details",
    book:book,
    genres:genres
  });
}

bookUpdatePost =[
  validateBook,
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const bookid = req.params.bookid;
      const book = await db.getBookByID(bookid);
      return res.status(400).render("updateBook", {
        title: "Edit book details",
        book:book,
        errors: errors.array(),
      });
    }
    const {name,author,genre} = req.body;
    await db.updateBook(req.params.bookid,name,author,genre);
    res.redirect("/");
  }
]
async function genreDeletePost (req, res) {
  const genreid = req.params.genreid
  await db.deleteGenre(genreid);
  res.redirect("/");
}

async function bookDeletePost (req, res) {
  const bookid = req.params.bookid
  await db.deleteBook(bookid);
  res.redirect("/");
}


module.exports = {
  bookListGet,
  bookAddGet,
  bookAddPost,
  genreAddGet,
  genreAddPost,
  authorAddGet,
  authorAddPost,
  genreUpdateGet,
  genreUpdatePost,
  bookUpdateGet,
  bookUpdatePost,
  genreDeletePost,
  bookDeletePost
};