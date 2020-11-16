var express = require("express");
var router = express.Router();
var models = require("../models");
const passport = require("passport");
const bodyParser = require("body-parser");
router.use(bodyParser.json());


//add a new project to users in UserProjects model
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const UserId = req.user.id; //grab id from token
    console.log(typeof req.user.id);
    const { ProjectId } = req.body;
    console.log(UserId);
    try {
      const user = await models.User.findOne({
        where: {
          id: UserId,
        },
      });
      const favorite = await user.addProject(ProjectId);
      console.log(ProjectId);
      res.send(favorite);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

//get projects for a specific user
router.get(
  "/projects",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.user.id;
    //console.log(UserId);
    //res.send(UserId);
    //grab the user by id
    try {
      const user = await models.User.findOne({
        where: {
          id: id,
        },
        include: models.Project,
      });
      //const projects = await user.getProject();
      res.send(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

module.exports = router;
