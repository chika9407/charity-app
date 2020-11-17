const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
var models = require("../models");
const organizations = require("../seed/orgsObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Organization.bulkCreate(organizations.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Organizations");
  },
};
