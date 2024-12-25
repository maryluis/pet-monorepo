'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn('now'),
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'updatedAt');
  },
};
