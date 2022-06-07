import { DataTypes } from 'sequelize';

import Sequelize from '../sequelize.js';

const Product = Sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  product_name: { type: DataTypes.STRING, allowNull: false },
  product_description: { type: DataTypes.STRING, allowNull: false },
  product_image: { type: DataTypes.TEXT, allowNull: false },
  product_price: { type: DataTypes.INTEGER, allowNull: false },
});

export default Product;
