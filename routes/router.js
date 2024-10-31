// routes/authorRouter.js
const { Router } = require("express");
const homePageController = require("../controllers/homePageController");
const bookController = require("../controllers/bookController");
const searchController = require("../controllers/searchController");
const errorController = require("../controllers/errorController")
const router = Router();

router.get("/", homePageController.homepageGet);
router.get("/searchAuthor", searchController.searchAuthorGet);
router.get("/searchTitle", searchController.searchTitleGet);
router.get("/addBook", bookController.bookAddGet);
router.post("/addBook", bookController.bookAddPost);
router.get("/addGenre", bookController.genreAddGet);
router.post("/addGenre", bookController.genreAddPost);
router.get("/addAuthor", bookController.authorAddGet);
router.post("/addAuthor", bookController.authorAddPost);
router.get("/:bookid/updatebook", bookController.bookUpdateGet);
router.post("/:bookid/updatebook", bookController.bookUpdatePost);
router.post("/:bookid/deletebook", bookController.bookDeletePost);
router.get("/:genreid/updategenre", bookController.genreUpdateGet);
router.post("/:genreid/updategenre", bookController.genreUpdatePost);
router.post("/:genreid/deletegenre", bookController.genreDeletePost);
router.get("/:genreid/list", bookController.bookListGet);
router.get("/:searchTerm",errorController.errorGet);

module.exports = router;
