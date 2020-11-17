const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
var models = require("../models");
const themes = require("../seed/themesObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Theme.bulkCreate(themes.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Themes");
    // const ids = themes.returnAll().map((e) => e.id);
    // return models.Theme.destroy({
    //   where: {
    //     id: ids,
    //   },
    // });
  },
};
