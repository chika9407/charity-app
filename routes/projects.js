var express = require("express");
var router = express.Router();
var models = require("../models");

/* GET all projects listing. */
router.get("/", async (req, res) => {
  const projects = await models.Projects.findAll();
  res.send(projects);
});

//get a project by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await models.Projects.findOne({
    where: {
      id,
    },
  });
  res.send(project);
});

//get project for a country

//add a new project to projects
router.post("/", async (req, res) => {
  const { name } = req.body;
  const project = await models.Projects.create({ name });
  res.send(project);
});

module.exports = router;
