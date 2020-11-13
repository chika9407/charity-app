const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;
var models = require("../models");
const projects = require("./projectsObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Projects.bulkCreate(projects.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    const id = projects.returnAll().map((e) => e.id);
    return models.Projects.destroy({
      where: {
        id: id,
      },
    });
  },
};
