const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
var models = require("../models");
var countries = require("../seed/countriesObj.js");
("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.Country.bulkCreate(countries.returnAll());
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Countries");
  },
};
