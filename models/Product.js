const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Product = db.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avaliable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    promo: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
});

module.exports = Product;