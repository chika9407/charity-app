"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", { name: DataTypes.STRING }, {});
  Project.associate = function (models) {
    //Users.hasMany(models.Projects);
    Project.belongsToMany(models.User, { through: "UserProjects" });
    Project.belongsTo(models.Organization);
    Project.belongsTo(models.Country);
    Project.belongsTo(models.Theme);
  };
  return Project;
};
