'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('wishes', 'isReceived', 'isReceived');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('wishes', 'isReceived', 'isReceived');
  },
};