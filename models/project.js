"use strict";
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: DataTypes.STRING,
      summary: DataTypes.TEXT,
      organization: DataTypes.STRING,
      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      address: DataTypes.STRING,
      latlon: DataTypes.STRING,
      funding: DataTypes.INTEGER,
      goal: DataTypes.INTEGER,
    },
    {}
  );
  Project.associate = function (models) {
    //Users.hasMany(models.Projects);
    Project.belongsToMany(models.User, { through: "UserProjects" });
    Project.belongsTo(models.Country);
    Project.belongsTo(models.Theme);
  };
  return Project;
};
