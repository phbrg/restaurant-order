const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Order = require('./Order');

const Kitchen = db.define('Kitchen', {
    order: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
});

Kitchen.belongsTo(Order);
Order.hasOne(Kitchen);

module.exports = Kitchen;