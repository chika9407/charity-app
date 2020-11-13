const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;
var models = require("../models");
const themes = require("./themesObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Themes.bulkCreate(themes.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    const ids = themes.returnAll().map((e) => e.id);
    return models.Themes.destroy({
      where: {
        id: ids,
      },
    });
  },
};
