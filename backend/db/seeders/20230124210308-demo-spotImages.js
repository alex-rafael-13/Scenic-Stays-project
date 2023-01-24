'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'image-url-1',
        preview: true
      },
      {
        spotId: 2,
        url: 'image-url-2',
        preview: true
      },
      {
        spotId: 3,
        url: 'image-url-3',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
   const Op = Sequelize.Op;
   options.tableName = 'SpotImages';

   return queryInterface.bulkDelete(options, {
    url: { [Op.in]: ['image-url-1', 'image-url-2', 'image-url-3'] }
  }, {});
  }
};
