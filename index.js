const express = require("express");
const app = express();
const articles = require("./utils/articles");

const PORT = process.env.PORT || 8000;

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/news", (req, res) => {
  articles.getAllSources(req, res).then((data) => {
    res.json(data);
  });
});

app.get("/news/:newspaperId", (req, res) => {
  articles.getSingleSource(req, res);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
