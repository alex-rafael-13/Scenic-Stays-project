'use strict';

/** @type {import('sequelize-cli').Migration} */
const { User, Spot } = require('../models')

//Create data source

const ownerSpots = [
  {
    username: 'Ironman',
    spots:[
      {
        address: "123 Times Square St",
        city: "New York City",
        state: "New York",
        country: "United States of America",
        lat: 40.7645358,
        lng: 74.4730327,
        name: "Avengers Tower",
        description: "Place where the Battle of New York ended and Loki was defeated",
        price: 70
      },
    ]
  },
  {
    username: 'Black-Panther',
    spots: [
      {
        address: "456 Royal Dr",
        city: "Golden City",
        state: "Birnin Zana",
        country: "Wakanda",
        lat: 1.7645358,
        lng: 37.4730327,
        name: "Royal Palace",
        description: "Home of the Black Panther and former king T'challa",
        price: 90
      },
      {
        address: "789 Killmonger Way",
        city: "Oakland",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: 122.4730327,
        name: "Erk Killmonger Outreach Center",
        description: "Home of Prince N'Jadaka and a Wakanda outreach center",
        price: 70
      },
    ]
  },
  {
    username: 'Captain-America',
    spots:[
      {
        address: "123 Shield Ave",
        city: "London",
        state: "London",
        country: "England",
        lat: 1.7645358,
        lng: 37.4730327,
        name: "Home of The First Avenger",
        description: "Laboratory where Steve Rogers became the first Avenger",
        price: 100
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
