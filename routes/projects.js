var express = require("express");
var router = express.Router();
var models = require("../models");
//const userMustBeLoggedIn = require("../guards/userMustBeLoggedIn");
const passport = require("passport");

/* GET all projects listing. */
router.get(
  "/",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    try {
      const projects = await models.Project.findAll();
      res.send(projects);
    } catch (err) {
      console.log(err);
    }
  }
);

//get a project by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const project = await models.Project.findOne({
    where: {
      id,
    },
  });
  res.send(project);
});

//add a new project to projects
router.post("/", async (req, res) => {
  const { name } = req.body;
  const project = await models.Project.create({ name });
  res.send(project);
});

module.exports = router;
