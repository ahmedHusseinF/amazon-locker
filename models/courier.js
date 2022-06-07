import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

import Sequelize from '../sequelize.js';

const Courir = Sequelize.define('Courir', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Courir.beforeCreate((courir) => {
  courir.password = bcrypt.hashSync(courir.password, 8);
});

Courir.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default Courir;
