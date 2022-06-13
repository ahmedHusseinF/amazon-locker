import { Location } from '../models/index.js';
import faker from '@faker-js/faker';

export default async function () {
  let locs = [
    {
      lat: "30.072886",
      lng: "31.345851",
      name: "City Stars Locker (Nasr City)"
    },
    {
      lat: "29.998853",
      lng: "31.173742",
      name: "Cairo Mall Locker (Haram)"
    },
    {
      lat: "29.963305",
      lng: "30.926505",
      name: "City Scape Mall Locker (6th of October)"
    },
    {
      lat: "29.965578",
      lng: "31.270191",
      name: "Maadi Grand Mall Locker (Maadi)"
    }
  ];

  await Location.create({
    lat: "30.081898",
    lng: "31.017981",
    name: "AAST Locker",
    active: true,
    remainingLockers: 2,
    lockersCount: 2
  });

  for (let i = 1; i <= 4; i++) {
    const rand = Math.round(Math.random() * 5) + 2;
    await Location.create({
      lat: locs[i-1].lat,
      lng: locs[i-1].lng,
      name: locs[i-1].name,
      active: true,
      remainingLockers: rand,
      lockersCount: rand
    });
  }

  await Location.create({
    lat: "30.044665",
    lng: "31.236245",
    name: "Locker for Disabled People (Tahrir)",
    active: true,
    remainingLockers: 5,
    lockersCount: 5
  })

  console.log('Seeded Locations');
}

