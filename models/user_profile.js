const Sequelize = require('sequelize');
const sequelize = require('./../mysql/database.js');

const UserProfile = sequelize.define("UserProfile", {
    userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        notEmpty: true

    },
    profileImage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        notEmpty: true
    },
    aboute:{
        type:Sequelize.TEXT                        ,
        allowNull:true,
        defaultValue:null
    }
});

module.exports = UserProfile;
