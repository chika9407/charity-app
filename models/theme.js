"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Theme = sequelize.define(
    "Theme",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  Theme.associate = function (models) {
    Theme.hasMany(models.Project);
  };
  return Theme;
};
