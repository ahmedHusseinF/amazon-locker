import { Location } from '../models/index.js';
import faker from '@faker-js/faker';

export default async function () { 
  await Location.create({
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
    name: "AAST Locker",
    active: true
  });

  for (let i = 1; i <= 4; i++) {
    await Location.create({
      lat: faker.address.latitude(),
      lng: faker.address.longitude(),
      name: faker.address.streetName() + " Locker",
      active: false,
    });
  }

  console.log('Seeded Locations');
}

