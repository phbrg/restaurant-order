import { DataTypes } from 'sequelize';
import { conn } from '../db/conn';

export const Customer = conn.define('Customer', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    table: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});