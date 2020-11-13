"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserProjects = sequelize.define("UserProjects", {});
  return UserProjects;
};
