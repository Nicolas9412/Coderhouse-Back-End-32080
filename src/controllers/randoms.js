const { getRandomsService } = require("../servicies/randoms");

function getRandoms(req, res) {
  const { cant = 100000000 } = req.query;
  const result = getRandomsService(cant);
  res.render("pages/infoRandoms.ejs", {
    numbers: Object.keys(result),
    values: Object.values(result),
  });
}

module.exports = { getRandoms };
