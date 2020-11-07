var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", async (req, res) => {
  const organizations = await models.Organizations.findAll();
  res.send(organizations);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const organization = await models.Organizations.findOne({
    where: {
      id,
    },
  });
  res.send(organization);
});

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const organization = await models.Organizations.findOne({
    where: {
      name,
    },
  });
  res.send(organization);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const organization = await models.Organizations.create({ name });
  res.send(organization);
});

module.exports = router;
