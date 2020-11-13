"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", { name: DataTypes.STRING }, {});
  Project.associate = function (models) {
    //Users.hasMany(models.Projects);
    Project.belongsToMany(models.User, { through: "UserProjects" });
    Project.belongsTo(models.Organizations);
    Project.belongsTo(models.Countries);
    Project.belongsTo(models.Themes);
  };
  return Project;
};
