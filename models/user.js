import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

import Sequelize from '../sequelize.js';

const User = Sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fcmToken: {
    type: DataTypes.TEXT,
  }
});

User.beforeCreate((user) => {
  user.password = bcrypt.hashSync(user.password, 8);
});

User.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
