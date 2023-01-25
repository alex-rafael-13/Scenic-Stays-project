'use strict';

const { Spot, User , Booking} = require('../models')

const bookingInfo = [
  {
    name: 'Royal Palace',
    bookings:[
      {
        username: 'Ironman',
        dates:{
          startDate: '2022-10-09',
          endDate: '2022-10-24'
        }
      }
    ]
  },
  {
    name: 'Avengers Tower',
    bookings:[
      {
        username: 'Captain-America',
        dates:{
          startDate: '2022-10-09',
          endDate: '2022-10-24'
        }
      }
    ]
  },
  {
    name: 'Home of The First Avenger',
    bookings:[
      {
        username: 'Black-Panther',
        dates:{
          startDate: '2022-10-09',
          endDate: '2022-10-24'
        }
      }
    ]
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    for(let i = 0; i < bookingInfo.length; i++){
      const {name, bookings } = bookingInfo[i]

      const spot = await Spot.findOne({where: {name}});

      for(let booking of bookings){
        const user = await User.findOne({where:{username:booking.username}});
        const dates = booking.dates
        await Booking.create({
          spotId: spot.id,
          userId: user.id,
          ...dates
        })
      }
    }

  },

  async down (queryInterface, Sequelize) {
    for(let i = 0; i < bookingInfo.length; i++){
      const {name, bookings } = bookingInfo[i]

      const spot = await Spot.findOne({where: {name}});

      for(let booking of bookings){
        const user = await User.findOne({where:{username:booking.username}});
        const dates = booking.dates
        await Booking.destroy({where:{
          spotId: spot.id,
          userId: user.id,
          ...dates
        }})
      }
    }
  }
};
