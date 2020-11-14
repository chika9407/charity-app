const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
var models = require("../models");
const organizations = require("./orgsObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Organization.bulkCreate(organizations.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    const id = organizations.returnAll().map((e) => e.id);
    return models.Organization.destroy({
      where: {
        id: id,
      },
    });
  },
};
