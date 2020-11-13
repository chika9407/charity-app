const fs = require("fs");
const path = require("path");
const parseString = require("xml2js").parseString;
var models = require("../models");
var countries = require("./countryObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Countries.bulkCreate(countries.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    const id = countries.returnAll().map((e) => e.id);
    return models.Countries.destroy({
      where: {
        id: id,
      },
    });
  },
};
