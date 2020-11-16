var express = require("express");
var router = express.Router();
var models = require("../models");
const passport = require("passport");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//add a new project to users in UserProjects model
router.post(
  "/",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    console.log(typeof req.user.id);
    const { UserId } = req.user.id; //grab id from token?
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

module.exports = router;
