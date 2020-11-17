const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
var models = require("../models");
const projects = require("../seed/projectsObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Project.bulkCreate(projects.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Projects");
  },
};
