"use strict";
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define("Country", { name: DataTypes.STRING }, {});
  Country.associate = function (models) {
    Country.hasMany(models.Project);
  };
  return Country;
};
