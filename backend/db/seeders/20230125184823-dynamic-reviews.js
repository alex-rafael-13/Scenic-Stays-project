'use strict';

const { User, Spot, Review } = require('../models')

const reviewInfo = [
  {
    name: 'Modern Style in Nature',
    reviews:[
      {
        username: 'Ironman',
        details:{
          review: 'Modern lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam.',
          stars: 5
        }
      }
    ]
  },
  {
    name: 'Home by the Clouds',
    reviews:[
      {
        username: 'Captain-America',
        details:{
          review: 'Clouds lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam.',
          stars: 4 
        }
      }
    ]
  },
  {
    name: 'Ski Haven',
    reviews:[
      {
        username: 'Black-Panther',
        details:{
          review: 'Ski lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam.',
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

        await Review.destroy({where:{
          spotId: spot.id,
          userId: user.id,
          ...details
        }})
      }
    }
  }
};
