const Sequelize = require('sequelize');
const sequelize = require('./../mysql/database.js');

const User = sequelize.define("User", {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
            allowNull: false,
            notEmpty: true
        }
    },
    firstName: {
        type: Sequelize.STRING,
        defaultValue: 'user',
        allowNull: false,
        notEmpty: true

    },
    lastName: {
        type: Sequelize.STRING,
        defaultValue: 'name',
        allowNull: false,
        notEmpty: true
    },
    email: {
        type: Sequelize.STRING,
        unique: 'compositeIndex',
        allowNull: false,
        notEmpty: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.STRING,
        unique: 'compositeIndex',
        allowNull: false
    },
    reg_time: {
        type: Sequelize.BIGINT(11),
        defaultValue: 0,
        allowNull: false
    },
    meta_info: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
    },
    contact: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
    }

});
module.exports = User;
