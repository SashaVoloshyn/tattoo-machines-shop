const {faker} = require('@faker-js/faker');
'use strict';

const machinesManufactures = [
    'DEFENDERR',
    'Bronc',
    'Bishop',
    'Ambition Machine',
    'Kwadron',
    'FK Irons',
    'Cheyenne',
    'ATOMUS',
    'MUST',
    'Dragon Hawk'
];

const countryManufactures = [
    'США',
    'Китай',
    'Україна',
    'Японія'
];

const needleStroke = [
  3,
  5,
  4
];

const machinesTypes = [
  'Роторна',
  'Індукційна',
  'Універсальна'
];

const color = [
  'Чорний',
  'Червоний',
  'Сріблястий',
  'Синій',
  'Фіолетовий'
];

const machinesWeight = [
  150,
  76,
  55,
  80,
  85,
  500,
  202,
  191,
  215,
  277,
  118
];

const material = [
  'Алюміній',
  'Цинк',
  'Пластик'
];



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TattooMachines', [...Array(200)].map(()=>({
        machine_manufacturer: machinesManufactures[Math.floor(Math.random() * machinesManufactures.length)],
        country_manufacturer: countryManufactures[Math.floor(Math.random() * countryManufactures.length)],
        color: color[Math.floor(Math.random() * color.length)],
        material: material[Math.floor(Math.random() * material.length)],
        weight: machinesWeight[Math.floor(Math.random() * machinesWeight.length)],
        type: machinesTypes[Math.floor(Math.random() * machinesTypes.length)],
        needle_stroke: needleStroke[Math.floor(Math.random() * needleStroke.length)],
        price: faker.random.numeric(5),
        name: faker.lorem.sentence(3),
        description: faker.lorem.sentence(20),
        images: JSON.stringify([...Array(7)].map(() => `${faker.image.urlLoremFlickr({category: 'technics'})}`)),
        vendor_code:faker.internet.password(),
        in_stock: faker.random.numeric(2),
        bestseller: faker.datatype.boolean(),
        new: faker.datatype.boolean(),
        popularity: faker.random.numeric(3),
        createdAt: new Date(),
        updatedAt: new Date()

    })));

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TattooMachines', null, {});
  }
};
