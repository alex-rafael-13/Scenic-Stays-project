'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Times Square St",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 40.7645358,
        lng: 74.4730327,
        name: "Avengers Tower",
        description: "Place where the Battle of New York ended as Loki was defeated",
        price: 70
      },
      {
        ownerId: 3,
        address: "456 Pietro Lane",
        city: "Ultron",
        state: "Accords",
        country: "Sokovia",
        lat: 48.7645358,
        lng: 14.4730327,
        name: "Pietro's Memorial",
        description: "Place where Pietro Maximoff sacrificed himself to save his home",
        price: 80
      },
      {
        ownerId: 2,
        address: "789 Royal Dr",
        city: "Golden City",
        state: "Birnin Zana",
        country: "Wakanda",
        lat: 1.7645358,
        lng: 37.4730327,
        name: "Royal Palace",
        description: "Home of the Black Panther and former king T'challa",
        price: 90
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Avengers Tower', "Pietro's Memorial", 'Royal Palace'] }
    }, {});
  }
};
