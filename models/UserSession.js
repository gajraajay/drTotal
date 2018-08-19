const Sequelize = require('sequelize');
const sequelize = require('./../mysql/database.js');

const UserSession = sequelize.define("UserSession", {
  authToken: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    notEmpty: true
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true

  },
  cookieKey: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  timeout: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true
  },
  inTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
    notEmpty: true
  }
});
module.exports = UserSession;
