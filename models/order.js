import { DataTypes } from 'sequelize';

import Sequelize from '../sequelize.js';

const Order = Sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  box_number: {
    type: DataTypes.INTEGER,
  },
  delivered: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  status: { type: DataTypes.ENUM('pending', 'in_locker', 'picked_up'), allowNull: false, defaultValue: 'pending' },
});

export default Order;
