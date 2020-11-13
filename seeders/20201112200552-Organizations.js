const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;
var models = require("../models");
const organizations = require("./orgsObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Organizations.bulkCreate(organizations.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    const id = organizations.returnAll().map((e) => e.id);
    return models.Organizations.destroy({
      where: {
        id: id,
      },
    });
  },
};
