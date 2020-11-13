var express = require("express");
var router = express.Router();
var models = require("../models");

//add a new project to users
router.post("/", async (req, res) => {
  const { ProjectId, UserId } = req.body;

  try {
    /*const project = await models.Project.findOne({
      where: {
        id: ProjectId,
      },
    });
    //res.send(project);*/

    const user = await models.User.findOne({
      where: {
        id: UserId,
      },
    });
    //res.send(user);
    /*const favorite = await user.addProject(project, {
      through: { id: ProjectId },
    });*/
    const favorite = await user.addProject(ProjectId);
    res.send(favorite);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
