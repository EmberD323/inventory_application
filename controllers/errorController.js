const db = require("../db/queries");

function errorGet (req, res) {
    console.log(req.params.searchTerm)
    res.render("404", {
        title: "homepage",
        searchTerm:req.params.searchTerm
    });
}
module.exports = {
  errorGet
};