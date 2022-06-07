import Sequelize from '../sequelize.js';
import Order from './order.js';
import User from './user.js';
import Product from './product.js';
import Courir from './courier.js';
import Location from './location.js';

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsTo(Product);
Product.hasMany(Order);

Order.belongsTo(Location);
Location.hasMany(Order);

if (process.env.npm_lifecycle_event == "seed") {
  await Sequelize.sync({force: true});
}

export { Order, User, Product, Courir, Location };
