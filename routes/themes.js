var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", async (req, res) => {
  const themes = await models.Theme.findAll();
  res.send(themes);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const theme = await models.Theme.findOne({
    where: {
      id,
    },
  });
  res.send(theme);
});

//get all projects by themeId

router.get("/:id/projects", async (req, res) => {
  const { id } = req.params;
  //grab the user by id
  const theme = await models.Theme.findOne({
    where: {
      id,
    },
    //include: models.Projects
  });
  const projects = await theme.getProjects();
  res.send(projects);
});

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const theme = await models.Theme.findOne({
    where: {
      name,
    },
  });
  res.send(theme);
});

//get all projects by themeName

router.get("/:name/projects", async (req, res) => {
  const { name } = req.params;
  //grab the user by id
  const theme = await models.Theme.findOne({
    where: {
      name,
    },
  });
  const projects = await theme.getProjects();
  res.send(projects);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const theme = await models.Theme.create({ name });
  res.send(theme);
});

module.exports = router;
