'use strict';
var Sequelize = require('sequelize');

module.exports = {
 
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Users', 'auth_token', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, null);

    queryInterface.addColumn('Users', 'social_auth', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }, null);
    return queryInterface.addColumn('Users', 'auth_type', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }, null);

  },

  down: (queryInterface, Sequelize) => {
     queryInterface.removeColumn('Users', 'auth_token');
      queryInterface.removeColumn('Users', 'auth_type')
      return queryInterface.removeColumn('Users', 'social_auth');
  }
};
