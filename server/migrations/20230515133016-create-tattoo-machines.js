'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TattooMachines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      machine_manufacturer: {
        type: Sequelize.STRING
      },
      country_manufacturer: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      vendor_code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(2048)
      },
      color: {
        type: Sequelize.STRING
      },
      weight: {
        type:Sequelize.INTEGER
      },
      images: {
        type: Sequelize.STRING(2048)
      },
      material: {
        type: Sequelize.STRING
      },
      in_stock: {
        type: Sequelize.INTEGER
      },
      bestseller: {
        type: Sequelize.BOOLEAN
      },
      new: {
        type: Sequelize.BOOLEAN
      },
      needle_stroke: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      popularity: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('TattooMachines');
  }
};