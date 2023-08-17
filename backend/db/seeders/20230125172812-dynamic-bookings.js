'use strict';

const { Spot, User , Booking} = require('../models')

const bookingInfo = [
  {
    name: 'Aurora Cabin',
    bookings:[
      {
        username: 'Ironman',
        dates:{
          startDate: '2030-10-09',
          endDate: '2030-10-24'
        }
      }
    ]
  },
  {
    name: 'Rustic Mountains',
    bookings:[
      {
        username: 'Ironman',
        dates:{
          startDate: '2030-11-09',
          endDate: '2030-11-24'
        }
      }
    ]
  },
  {
    name: 'Classical Villa',
    bookings:[
      {
        username: 'Ironman',
        dates:{
          startDate: '2030-12-09',
          endDate: '2030-12-24'
        }
      }
    ]
  },
  {
    name: 'Hill Residence',
    bookings:[
      {
        username: 'Ironman',
        dates:{
          startDate: '2030-01-09',
          endDate: '2030-01-24'
        }
      }
    ]
  },
  {
    name: 'Nani Resort',
    bookings:[
      {
        username: 'Ironman',
        dates:{
          startDate: '2030-02-09',
          endDate: '2030-02-24'
        }
      }
    ]
  },
  {
    name: 'Mountain Luxury',
    bookings:[
      {
        username: 'Ironman',
        dates:{
          startDate: '2030-03-09',
          endDate: '2030-03-24'
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
