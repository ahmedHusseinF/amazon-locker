import dotenv from 'dotenv';
import express from 'express';
//import { join } from 'path';
import authRoutes from './routes/auth.js';
import piRoutes from './routes/pi.js';
import appRoutes from './routes/app.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/app', appRoutes);
app.use('/pi', piRoutes);

app.get('/ping', (_, res) => {
  res.status(200).send('pong');
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}`);
});
