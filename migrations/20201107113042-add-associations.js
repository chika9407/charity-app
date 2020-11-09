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
    await queryInterface.addColumn("Projects", "RegionId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Regions",
        key: "id",
      },
    });
    await queryInterface.addColumn("Projects", "ThemeId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Themes",
        key: "id",
      },
    });
    await queryInterface.addColumn("Projects", "OrganizationId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Organizations",
        key: "id",
      },
    });
    await queryInterface.addColumn("Regions", "CountryId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Countries",
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Projects", "UserId");
    await queryInterface.removeColumn("Projects", "RegionId");
    await queryInterface.removeColumn("Projects", "ThemeId");
    await queryInterface.removeColumn("Projects", "OrganizationId");
    await queryInterface.removeColumn("Regions", "CountryId");
  },
};
