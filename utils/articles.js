const axios = require("axios");
const cheerio = require("cheerio");
const newsPapers = require("./newsPapers");

function getAllSources(req, res) {
  return new Promise((resolve) => {
    const articles = [];
    let counter = 0;

    newsPapers.forEach((newsPaper) => {
      axios
        .get(newsPaper.address)
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);

          $('a:contains("climate")', html).each(function () {
            const title = $(this).text();
            const url = $(this).attr("href");
            articles.push({
              title,
              url: newsPaper.base + url,
              source: newsPaper.name,
            });
          });
        })
        .then(() => {
          counter++;
          if (counter === newsPapers.length) {
            resolve(articles);
          }
        })
        .catch((err) => {
          counter++;
          if (counter === newsPapers.length) {
            resolve(articles);
          }

          console.log(err);
        });
    });
  });
}

function getSingleSource(req, res) {
  const newspaperId = req.params.newspaperId;

  const newsPaper = newsPapers.find(
    (newsPaper) => newsPaper.name === newspaperId
  );

  const newsPaperAddress = newsPaper.address;
  const newsPaperBase = newsPaper.base;

  axios
    .get(newsPaperAddress)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const articles = [];
      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: newsPaperBase + url,
          source: newspaperId,
        });
      });
      res.json(articles);
    })
    .catch((err) => res.send(err));
}

module.exports = {
  getAllSources,
  getSingleSource,
};
