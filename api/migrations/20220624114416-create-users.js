"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userName: {
        type: Sequelize.STRING,
        required: true
      },
      givenName: {
        type: Sequelize.STRING,
        required: false
      },
      surName: {
        type: Sequelize.STRING,
        required: false
      },
      dob: {
        type: Sequelize.STRING,
        required: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  }
};