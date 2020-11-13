"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    { username: DataTypes.STRING, password: DataTypes.STRING },
    {}
  );
  User.associate = function (models) {
    //Users.hasMany(models.Projects);
    User.belongsToMany(models.Project, { through: "UserProjects" });
  };
  return User;
};
