'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'demo@user.io',
        username: 'Ironman',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'King',
        lastName: 'Tchalla',
        email: 'user1@user.io',
        username: 'Black-Panther',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Steve',
        lastName: 'Rogers',
        email: 'user2@user.io',
        username: 'Captain-America',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Ironman', 'Black-Panther', 'Captain-America'] }
    }, {});
  }
};
