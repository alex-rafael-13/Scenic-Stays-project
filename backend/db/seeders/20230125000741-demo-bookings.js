'use strict';

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'Bookings';

   return queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 3,
      startDate: "2022-10-09",
      endDate: "2022-10-24"
    },
    {
      spotId: 2,
      userId: 1,
      startDate: "2022-10-09",
      endDate: "2022-10-24"
    },
    {
      spotId: 3,
      userId: 2,
      startDate: "2022-10-09",
      endDate: "2022-10-24"
    }
   ])

  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    options.tableName = 'Bookings';

    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
