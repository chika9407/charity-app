"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Regions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Regions.associate = function (models) {
        Regions.hasMany(models.Projects);
        Regions.hasMany(models.Countries);
        /*Regions.hasMany(models.Countries, {
          foreignKey: "",
          sourceKey: "isoCode",
        });*/
      };
    }
  }
  Regions.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Regions",
    }
  );
  return Regions;
};
