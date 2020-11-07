var express = require("express");
var router = express.Router();
var models = require("../models");

/* GET users listing. */

router.get("/", async (req, res) => {
  //get all users
  const users = await models.Users.findAll();
  //if we want projects for all users right away then use the expression below
  // instead of the previous one
  //const users = await models.Users.findAll({include: models.Projects});
  res.send(users);
});

//get user by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await models.Users.findOne({
    where: {
      id,
    },
  });
  res.send(user);
});

//get projects for a specific user

router.get("/:id/projects", async (req, res) => {
  const { id } = req.params;
  //grab the user by id
  const user = await models.Users.findOne({
    where: {
      id,
    },
    //include: models.Projects
  });
  const projects = await user.getProjects();
  res.send(projects);
});

//add a user to users
router.post("/", async (req, res) => {
  const { username } = req.body;
  //const {password} = req.body
  const user = await models.Users.create({ username });
  //add password later as part of the authentication (TBD by Rasini)
  res.send(user);
});

//add a project to a user

router.post("/:id/projects", async (req, res) => {
  const { id } = req.body;
  const { name } = req.body;

  //grab the user by id first
  const user = await models.Users.findOne({
    where: {
      id,
    },
  });
  const project = await user.createProjects({ name });

  res.send(project);
});

module.exports = router;
