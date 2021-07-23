'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert('permissions', [{
      role: 'user',
      created_at: now,
      updated_at: now
    }, {
      role: 'admin',
      created_at: now,
      updated_at: now
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
