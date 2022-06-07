import CourirSeeder from './seed_courir.js';
import ProductSeeder from './seed_products.js';
import LocationSeeder from './seed_locations.js';

await CourirSeeder();
await ProductSeeder();
await LocationSeeder();