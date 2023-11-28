const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Order = db.define('Order', {
    products: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
});

module.exports = Order;