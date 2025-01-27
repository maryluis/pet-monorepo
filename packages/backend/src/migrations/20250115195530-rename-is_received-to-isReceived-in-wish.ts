'use strict';

module.exports = {
  up: async (queryInterface) => {
    const [results] = await queryInterface.sequelize.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'wishes' AND column_name = 'isReceived';
    `);

    if (results.length === 0) {
      await queryInterface.renameColumn('wishes', 'is_received', 'isReceived');
    }
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('wishes', 'isReceived', 'is_received');
  },
};
