var express = require("express");
var router = express.Router();
var models = require("../models");

//add a new project to projects
router.post("/", async (req, res) => {
  const { ProjectId } = req.body;
  const { UserId } = req.body;

  const project = await models.Projects.findOne({
    where: {
      id: ProjectId,
    },
  });
  res.send(project);

  const user = await models.Users.findOne({
    where: {
      id: UserId,
    },
  });
  const favorite = await user.addProjects(project, {
    through: { id: ProjectId },
  });
  res.send(favorite);
});

module.exports = router;
