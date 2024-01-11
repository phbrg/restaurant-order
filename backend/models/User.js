const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    table: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    exit: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = User;