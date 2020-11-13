var express = require("express");
var router = express.Router();
var models = require("../models");
require("dotenv").config();
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const secret = process.env.SECRET;
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

router.delete("/logout", (req, res) => {
  req.logOut();
  res.send({ message: "Log Out successful" });
});

//Login User
router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed json web token with the contents of user object and return it in the response
      // console.log({ user, secret });
      const token = jwt.sign({ user_id: user.id }, secret);

      return res.json({
        user: { id: user.id, username: user.username },
        token,
      });
    });
  })(req, res);
});

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
});

//add a project to a user

router.post("/:id/projects", async (req, res) => {
  const { id } = req.params;
  const { ProjectId } = req.body;

  //grab the user by id first
  const user = await models.Users.findOne({
    where: {
      id,
    },
  });
  const project = await user.addProjects({ id: ProjectId });

  res.send(project);
});

// GET current logged-in user
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // we will receive any information from the JWTStrategy in the req.user
    res.send({
      message: "Here is the PROTECTED data for user ",
      user: req.user,
    });
  }
);

module.exports = router;
