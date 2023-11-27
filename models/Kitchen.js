const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Cart = require('./Cart');

const Kitchen = db.define('Kitchen', {
    order: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Preparando pedido.'
    }
});

Kitchen.belongsTo(Cart);
Cart.hasOne(Kitchen);

module.exports = Kitchen;