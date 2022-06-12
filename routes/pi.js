import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import { Order, Courir } from '../models/index.js';
import serviceAccount from "../firebase-creds.json" assert {type: "json"};

const router = express.Router();
initializeApp({
  credential: cert(serviceAccount),

});
const fcm = getMessaging();

router.post('/validate_otp', async (req, res) => {
  const { otp } = req.body;

  const order = await Order.findOne({ otp });

  if (!order) {
    return res.status(400).json({
      error: 'Invalid OTP',
    });
  }

  if (order.status == "picked_up") {
    return res.status(400).json({
      error: 'Order already picked up',
    });
  }

  order.status = "picked_up";
  await order.save();

  return res.status(200).json({
    box_number: order.box_number,
    message: 'Order has been delivered successfully',
  });
});

router.post('/insert_package', async (req, res) => {
  const { order_id, box_number, courir_id, courir_password } = req.body;

  const courir = await Courir.findByPk(courir_id);

  if (!courir) {
    return res.status(404).json('Courir not found');
  }

  const isOk = courir.checkPassword(courir_password);
  if (!isOk) {
    return res.status(400).json('Invalid courir password');
  }

  const order = await Order.findByPk(order_id);
  const user = await order.getUser();
  order.status = 'in_locker';
  order.box_number = box_number;
  await order.save();
  
  if (user.fcmToken) {
    await fcm.send({
      token: user.fcmToken,
      notification: { 
        title: "Your package has been delivered to the locker 🎉",
        body: `Your order of ${order.product.name} has been successfully delivered to the chosen locker. You can collect it now.`,
        imageUrl: "https://locker.fekry.dev/images/n.jpg"
      }
    });
  }
  

  return res.status(200).json({
    message: 'Package inserted successfully',
  });
});

export default router;
