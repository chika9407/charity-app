"use strict";
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define(
    "Organization",
    { name: DataTypes.STRING },
    {}
  );
  Organization.associate = function (models) {
    Organization.hasMany(models.Project);
  };
  return Organization;
};
