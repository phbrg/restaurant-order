const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Customer = require('./Customer');

const Cart = db.define('Cart', {
    product: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
});

Cart.belongsTo(Customer);
Customer.hasMany(Cart);

module.exports = Cart;