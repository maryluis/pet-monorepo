'use strict';

module.exports = {
  up: async (queryInterface) => {
    const [results] = await queryInterface.sequelize.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'wishes' AND column_name = 'isAssigned';
    `);

    if (results.length === 0) {
      await queryInterface.renameColumn('wishes', 'is_assigned', 'isAssigned');
    }
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('wishes', 'isAssigned', 'is_assigned');
  },
};
