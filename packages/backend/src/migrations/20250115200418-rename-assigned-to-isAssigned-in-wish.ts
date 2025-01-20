'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('wishes', 'isAssigned', 'isAssigned');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('wishes', 'isAssigned', 'isAssigned');
  },
};
