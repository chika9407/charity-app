"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Projects", "UserId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    });
    await queryInterface.addColumn("Projects", "CountryId", {
      type: Sequelize.STRING,
      references: {
        model: "Countries",
        key: "id",
      },
    });
    await queryInterface.addColumn("Projects", "ThemeId", {
      type: Sequelize.STRING,
      references: {
        model: "Themes",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Projects", "UserId");
    await queryInterface.removeColumn("Projects", "CountryId");
    await queryInterface.removeColumn("Projects", "ThemeId");
  },
};
