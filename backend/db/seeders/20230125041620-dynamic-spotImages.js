'use strict';

/** @type {import('sequelize-cli').Migration} */
//import models
const { Spot, SpotImage } = require('../models')

//Create data
const spotImages = [
  {
    name: 'Avengers Tower',
    images: [
      {
        url: "tower-image-url-1",
        preview: true
      }
    ]
  },
  {
    name: 'Royal Palace',
    images: [
      {
        url: "palace-image-url-1",
        preview: true
      }
    ]
  },
  {
    name: 'Erk Killmonger Outreach Center',
    images: [
      {
        url: "outreach-image-url-1",
        preview: true
      }
    ]
  },
  {
    name: 'Home of The First Avenger',
    images: [
      {
        url: "home-image-url-1",
        preview: true
      }
    ]
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    //extract data from spotImages arr
    
    for(let spotId = 0; spotId < spotImages.length; spotId++){

      const {name, images } = spotImages[spotId];
      const spot = await Spot.findOne({where: {name}})
      
      for(let imgId = 0; imgId < images.length; imgId++){
        const image = images[imgId]

        await SpotImage.create({...image, spotId: spot.id})
      }
    }
  },

  async down (queryInterface, Sequelize) {
    for(let spotId = 0; spotId < spotImages.length; spotId++){
      const {name, images} = spotImages[spotId];
      const spot = await Spot.findOne({where: {name}})

      for(let imgId = 0; imgId < images.length; imgId++){
        let image = images[imgId]
        await SpotImage.destroy({where: {...image, spotId: spot.id}})
      }
    }
  }
};

