const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
var models = require("../models");
var countries = require("./countryObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Country.bulkCreate(countries.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    const id = countries.returnAll().map((e) => e.id);
    return models.Country.destroy({
      where: {
        id: id,
      },
    });
  },
};
