var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", async (req, res) => {
  res.send("hi");
});

router.get("/themes", async (req, res) => {
  const themes = await models.Theme.findAll();
  res.send(themes);
});

router.get("/countries", async (req, res) => {
  const countries = await models.Country.findAll();
  res.send(countries);
});

router.get("/search/:themeId?/:countryId?/:keyword?", async (req, res) => {
  let { themeId, countryId, keyword } = req.params;
  let sqlAr = [];
  if (themeId != 0) {
    themeId = `themeId='${String(themeId)}'`;
    sqlAr.push(themeId);
  }
  if (countryId != 0) {
    countryId = `countryId='${String(countryId)}'`;
    sqlAr.push(countryId);
  }
  if (keyword != 0) {
    keyword = `name like '%${String(keyword)}%'`;
    sqlAr.push(keyword);
  }
  let final = sqlAr.leng > 0 ? " WHERE " + sqlAr.join(" AND ") : "";
  console.log("final", final);
  const results = await models.sequelize.query(
    `SELECT * FROM Projects${final} LIMIT 50;`,
    {
      type: sequelize.QueryTypes.SELECT,
    }
  );
  res.send(results);
});

module.exports = router;
// SELECT * FROM Projects WHERE themeId='edu' AND countryId='TH' AND name LIKE '%teach%';
