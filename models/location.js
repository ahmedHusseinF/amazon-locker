import { DataTypes } from 'sequelize';

import Sequelize from '../sequelize.js';

const Location = Sequelize.define('Location', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  lat: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  lng: {
    type: DataTypes.REAL,
    allowNull: false,
  },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

export default Location;
