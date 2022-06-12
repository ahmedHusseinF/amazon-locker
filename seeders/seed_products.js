import { Product } from '../models/index.js';
import faker from '@faker-js/faker';

export default async function () {

  const products = [
    {
      product_name: "Apple iPhone 13 Pro",
      product_description: "iPhone 13 Pro. The biggest Pro camera system upgrade ever. Super Retina XDR display with ProMotion for a faster, more responsive feel. Lightning-fast A15 Bionic chip. Durable design and a huge leap in battery life.",
      product_image: "https://m.media-amazon.com/images/I/61sDyXAepuL._AC_SL1500_.jpg",
      product_price: 25860,
    },
    {
      product_name: "Apple AirPods Pro, White",
      product_description: "AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort.",
      product_image: "https://m.media-amazon.com/images/I/31IE9Ge6+EL._AC_.jpg",
      product_price: 4300,
    },
    {
      product_name: "Rimini 2450 Canvas Lace-Up Casual Shoes for Men",
      product_description: "Explore the super chic footwear collection by Rimini and be sure to find just what you are looking for.",
      product_image: "https://m.media-amazon.com/images/I/61j2FE9APWL._AC_SX575_.jpg",
      product_price: 219,
    },
    {
      product_name: "HW57 Pro Smartwatch",
      product_description: `HW57 PRO Screen Size: 1.77" HD IPS Touch Screen Bluetooth Battery 200mAh Wireless Charging Up to 7 Days Bluetooth Support: Android 5.0+, ios 10.0+`,
      product_image: "https://m.media-amazon.com/images/I/41kWUH1aWoL._AC_.jpg",
      product_price: 799,
    },
    {
      product_name: "DOLCE & GABBANA L'IMPERATRICE",
      product_description: "DOLCE & GABBANA L'IMPERATRICE (W) EDT 100ML",
      product_image: "https://m.media-amazon.com/images/I/51tbmMxEiKS._AC_SL1000_.jpg",
      product_price: 1121,
    }
  ];

  for (let i = 1; i <= 5; i++) {
    await Product.create(products[i-1]);
  }

  console.log('Seeded products');
}

