const db = require("../db/queries");

async function homepageGet (req, res) {
  const genres = await db.getAllGenres();
  res.render("homepage", {
    title: "homepage",
    genres:genres
  });
}
module.exports = {
  homepageGet
};