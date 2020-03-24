const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All Authors Route
router.get("/", async (req, res) => {
  let searchOpt = {};
  if (req.query.name !== null && req.query.name !== "") {
    searchOpt.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOpt);
    res.render("authors/index", { authors: authors, searchOpt: req.query });
  } catch (error) {
    res.redirect("/");
  }
});

//New Author
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//let locals = { errorMessage: `Error Creating author` };

//Create Author

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`);
  } catch (error) {
    res.render("authors/new", {
      author,
      errorMessage: `Error Creating author`
    });
  }
});

module.exports = router;
