"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      organization: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.INTEGER,
      },
      lon: {
        type: Sequelize.INTEGER,
      },
      funding: {
        type: Sequelize.INTEGER,
      },
      goal: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};
