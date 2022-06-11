import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, name, fcmToken } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      error: 'Please provide all the required fields',
    });
  }

  const user = User.build({
    email,
    password,
    name,
    fcmToken
  });

  try {
    await user.save();
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }

  return res.status(201).json({
    user_id: user.id,
    email,
    name,
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: 'Please provide all the required fields',
    });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  const isOk = await user.checkPassword(password);

  if (!isOk) {
    return res.status(401).json({
      error: 'Password is not correct',
    });
  }
  const access_token = jwt.sign({ user_id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '30d' });

  return res.status(200).json({
    access_token,
    user_id: user.id,
    name: user.name,
    email: user.email
  });
});

export default router;
