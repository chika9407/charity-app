var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", async (req, res) => {
  const countries = await models.Countries.findAll();
  res.send(countries);
});

//get country by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const country = await models.Countries.findOne({
    where: {
      id,
    },
    //include: models.Projects,
  });
  res.send(country);
});

//get projects by Country isoCode

router.get("/:isoCode/projects", async (req, res) => {
  const { isoCode } = req.params;
  const country = await models.Countries.findOne({
    where: {
      isoCode,
    },
  });
  const projects = await country.getProjects();
  res.send(projects);
});

//get country by name - not sure if it's necessary if we'll have isoCode

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const country = await models.Countries.findOne({
    where: {
      name,
    },
  });
  res.send(country);
});

//don't think we'll be adding new countries, that's why the post method is commented

/*router.post("/", async (req, res) => {
  const { name } = req.body;
  const country = await models.Countries.create({ name });
  res.send(country);
});*/

module.exports = router;
