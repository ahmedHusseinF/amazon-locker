import { Courir } from '../models/index.js';
import faker from '@faker-js/faker';



export default async function () {
  await Courir.create({
    id: faker.random.numeric(6),
    password: 'test12345',
  });
  
  console.log('Seeded courir');
}