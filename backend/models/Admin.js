const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Admin = db.define('Admin', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Admin;