const Sequelize = require('sequelize');
const sequelize = require('./../mysql/database.js');

const UserRole = sequelize.define("UserRole", {
    userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        notEmpty: true

    },
    roleIds: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
    }
});

module.exports = UserRole;
