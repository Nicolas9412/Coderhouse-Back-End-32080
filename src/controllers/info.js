const { getInfoProcess } = require("../servicies/info");

function getInfoProcessBloq(req, res) {
  const info = getInfoProcess();
  console.log(info);
  res.render("pages/infoProcess.ejs", { info });
}

function getInfoProcessNoBloq(req, res) {
  const info = getInfoProcess();
  res.render("pages/infoProcess.ejs", { info });
}

module.exports = { getInfoProcessBloq, getInfoProcessNoBloq };
