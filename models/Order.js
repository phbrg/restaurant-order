const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Customer = require('./Customer');

const Order = db.define('Order', {
    products: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
});

Order.belongsTo(Customer);
Customer.hasMany(Order);

module.exports = Order;