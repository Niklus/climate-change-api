const express = require("express");
const app = express();
const articles = require("./utils/articles");

const PORT = process.env.port || 8000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the climate change News API</h1>");
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
