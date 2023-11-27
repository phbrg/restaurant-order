const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Customer = db.define('Customer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    table: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    exitDate: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
});

module.exports = Customer;