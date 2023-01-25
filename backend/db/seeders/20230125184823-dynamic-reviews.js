'use strict';

const { User, Spot, Review } = require('../models')

const reviewInfo = [
  {
    name: 'Royal Palace',
    reviews:[
      {
        username: 'Ironman',
        details:{
          review: 'Love what Shuri has done with the place!',
          stars: 5
        }
      }
    ]
  },
  {
    name: 'Avengers Tower',
    reviews:[
      {
        username: 'Captain-America',
        details:{
          review: 'Kind of destroyed after Loki attacked it',
          stars: 4 
        }
      }
    ]
  },
  {
    name: 'Home of The First Avenger',
    reviews:[
      {
        username: 'Black-Panther',
        details:{
          review: 'Historic place, 10/10 would recommend',
          stars: 5
        }
      }
    ]
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    for(let i = 0; i < reviewInfo.length; i++){
      const { name, reviews } = reviewInfo[i]

      const spot = await Spot.findOne({where: {name}})

      for(let review of reviews){
        const user = await User.findOne({where: {username: review.username}})
        const details = review.details

        await Review.create({
          spotId: spot.id,
          userId: user.id,
          ...details
        })
      }
    }

  },

  async down (queryInterface, Sequelize) {
    for(let i = 0; i < reviewInfo.length; i++){
      const { name, reviews } = reviewInfo[i]

      const spot = await Spot.findOne({where: {name}})

      for(let review of reviews){
        const user = await User.findOne({where: {username: review.username}})
        const details = review.details

        await Review.create({where:{
          spotId: spot.id,
          userId: user.id,
          ...details
        }})
      }
    }
  }
};
