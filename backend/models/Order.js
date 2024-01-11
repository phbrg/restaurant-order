const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./User');

const Order = db.define('Order', {
    order: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('Preparando pedido.', 'Pedido a caminho', 'Pedido entregue'),
      defaultValue: 'Preparando pedido.'
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
});

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;