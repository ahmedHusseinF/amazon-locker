import { Product } from '../models/index.js';
import faker from '@faker-js/faker';

export default async function () { 
  for (let i = 1; i <= 10; i++) {
    await Product.create({
      product_name: faker.commerce.productName(),
      product_description: faker.commerce.productDescription(),
      product_image: faker.image.abstract(null, null, true),
      product_price: +faker.commerce.price(10, 50, 0),
    });
  }

  console.log('Seeded products');
}

