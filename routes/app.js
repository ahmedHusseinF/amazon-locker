import express from 'express';
import validateAuth from '../middlewares/validateAuth.js';
import { Order, Product, Location } from '../models/index.js';

const router = express.Router();

/**
 * @api {post} /app/generate_otp Generate OTP
 * @apiGroup Flutter
 * @apiDescription Generate OTP from the user and return the otp to the app.
 */
router.post('/generate_otp', validateAuth, async (req, res) => {
  const { order_id } = req.body;

  const order = await Order.findByPk(order_id);

  if (!order) {
    return res.status(400).json({
      error: 'Order not found',
    });
  }

  return res.status(201).json({
    otp: order.otp,
    location: await order.getLocation(),
  });
});

router.post('/buy_product', validateAuth, async (req, res) => {
  const { product_id, location_id } = req.body;
  const { user_id } = req.user;

  const product = await Product.findByPk(product_id, { raw: true });

  if (!product) {
    return res.status(404).json({
      error: 'Product not found',
    });
  }

  const location = await Location.findByPk(location_id, { raw: true });

  if (!location) {
    return res.status(404).json({
      error: 'Location not found',
    });
  }

  const order = await Order.create({
    UserId: user_id,
    otp: Math.random().toString(10).substring(2, 8),
    ProductId: product_id,
    LocationId: location_id,
  });

  return res.status(201).json({
    message: 'Product ordered successfully',
    order: order.toJSON(),
  });
});

router.get('/get_locations', async (req, res) => {
  const locations = await Location.findAll({ raw: true });

  return res.status(200).json(locations);
});

router.get('/get_products', async (req, res) => {
  const products = await Product.findAll({ raw: true });

  return res.status(200).json(products);
});

router.get('/get_orders', validateAuth, async (req, res) => {
  const { user_id } = req.user;

  const orders = await Order.findAll({ where: {UserId: user_id}, include: ['Location', 'Product'] });

  return res.status(200).json(orders);
});

export default router;
