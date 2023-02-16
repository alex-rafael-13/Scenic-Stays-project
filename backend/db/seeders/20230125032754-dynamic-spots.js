'use strict';

/** @type {import('sequelize-cli').Migration} */
const { User, Spot } = require('../models')

//Create data source

const ownerSpots = [
  {
    username: 'Ironman',
    spots:[
      {
        address: "123 Rocky Dr",
        city: "Bear Mountain",
        state: "Colorado",
        country: "United States of America",
        lat: 40.7645358,
        lng: 74.4730327,
        name: "Home by the Clouds",
        description: "Clouds lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
        price: 135.95
      },
    ]
  },
  {
    username: 'Black-Panther',
    spots: [
      {
        address: "123 Rural Retreat St",
        city: "Snowdonia",
        state: "Wales",
        country: "United Kingdom",
        lat: 1.7645358,
        lng: 37.4730327,
        name: "Rural Retreat",
        description: "Rural retreat lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
        price: 395.25
      },
      {
        address: "123 Modern Retreat St",
        city: "Macedon Ranges",
        state: "Victia",
        country: "Australia",
        lat: 37.7645358,
        lng: 122.4730327,
        name: "Modern Style in Nature",
        description: "Modern lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
        price: 267.50
      },
    ]
  },
  {
    username: 'Captain-America',
    spots:[
      {
        address: "123 Snowy Drive",
        city: "Chalot",
        state: "Quebec",
        country: "Canada",
        lat: 1.7645358,
        lng: 37.4730327,
        name: "Ski Haven",
        description: "Ski lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Congue quisque egestas diam in arcu cursus. Massa ultricies mi quis hendrerit dolor magna eget est. Adipiscing at in tellus integer feugiat scelerisque. Arcu non sodales neque sodales ut etiam sit amet. Faucibus in ornare quam viverra orci sagittis.",
        price: 1240.20
      },
    ]
  }
]


module.exports = {
  async up (queryInterface, Sequelize) {
    
    //Find the data needed for dynamic seeding
    for(let userId = 0; userId < ownerSpots.length; userId++){
      //extract username and spots owned from ownerSpots 
      const {username, spots } = ownerSpots[userId];
      const owner = await User.findOne({where: {username}})

      for(let spotId = 0; spotId < spots.length; spotId++){
        const spot = spots[spotId];

        await Spot.create({...spot, ownerId: owner.id})
      }
    }

  },

  async down (queryInterface, Sequelize) {
    
    for(let userId = 0; userId < ownerSpots.length; userId++){
      //extract username and spots owned from ownerSpots 
      const {username, spots } = ownerSpots[userId];
      const owner = await User.findOne({where: {username}})

      for(let spotId = 0; spotId < spots.length; spotId++){
        const spot = spots[spotId];

      await Spot.destroy({where: {...spot, ownerId: owner.id}})
      }
    }
  }
};
