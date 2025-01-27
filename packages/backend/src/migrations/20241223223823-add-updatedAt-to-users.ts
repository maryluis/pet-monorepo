'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [results] = await queryInterface.sequelize.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'users' AND column_name = 'updatedAt';
    `);

    if (results.length === 0) {
      await queryInterface.addColumn('users', 'updatedAt', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.fn('now'),
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('users', 'updatedAt');
  },
};

