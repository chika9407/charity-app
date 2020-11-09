var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", async (req, res) => {
  const regions = await models.Regions.findAll();
  res.send(regions);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const region = await models.Regions.findOne({
    where: {
      id,
    },
  });
  res.send(region);
});

//get all projects by regionID

router.get("/:id/projects", async (req, res) => {
  const { id } = req.params;
  //grab the region by id
  const region = await models.Regions.findOne({
    where: {
      id,
    },
  });
  const projects = await region.getProjects();
  res.send(projects);
});

//get all regions by name
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const region = await models.Regions.findOne({
    where: {
      name,
    },
  });
  res.send(region);
});

////get all projects by region name

router.get("/:name/projects", async (req, res) => {
  const { name } = req.params;
  //grab the region by id
  const region = await models.Regions.findOne({
    where: {
      name,
    },
  });
  const projects = await region.getProjects();
  res.send(projects);
});

//get countries by region

router.get("/:id/countries", async (req, res) => {
  const { id } = req.params;

  //grab the region by id
  const region = await models.Regions.findOne({
    where: {
      id,
    },
  });
  const countries = await region.getCountries();
  res.send(countries);
});

module.exports = router;
