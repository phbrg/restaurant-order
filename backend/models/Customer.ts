import { DataTypes } from 'sequelize';
import { conn } from '../db/conn';

let unbug: string = '\\';

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