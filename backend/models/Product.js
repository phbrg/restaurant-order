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
        type: DataTypes.ENUM('PRATO FEITO', 'LANCHE', 'HAMBURGER', 'BEBIDA', 'ACOMPANHAMENTO', 'SOBREMESA'),
        allowNull: false
    },
    avaliable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    promotion: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});

module.exports = Product;