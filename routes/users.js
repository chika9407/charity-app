var express = require("express");
var router = express.Router();
var models = require("../models");
require("dotenv").config();
var bcrypt = require("bcrypt");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const initializePassport = require("./passportConfig");
const saltRounds = 10;

/* GET users listing. */

router.get("/", async (req, res) => {
  //get all users
  const users = await models.Users.findAll();
  //if we want projects for all users right away then use the expression below
  // instead of the previous one
  //const users = await models.Users.findAll({include: models.Projects});
  res.send(users);
  //req.user once authenticated
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
/*router.post("/", async (req, res) => {
  const { username } = req.body;
  //const {password} = req.body
  const user = await models.Users.create({ username });
  //add password later as part of the authentication (TBD by Rasini)
  res.send(user);*/

//Login User
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

//need to pass initializePassport as one of the params in post method

//add a user to users, INSERT (Register) a new user
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await models.Users.create({ username, password: hash });

    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
  //not sure why it's not sending the password? password: null

  //
  // console.log(password);
  // console.log(hash);
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
