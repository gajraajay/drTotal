const Sequelize = require('sequelize');
const sequelize = require('./../mysql/database.js');

const roles = sequelize.define("Role", {
    roleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        notEmpty: true
    },
    roleName: {
        type: Sequelize.STRING,
        unique: 'compositeIndex',
        allowNull: false,
        notEmpty: true
    },
    roleRules: {
        type: Sequelize.TEXT,
        allowNull: false,
        notEmpty: true
    }
});

module.exports = roles;
