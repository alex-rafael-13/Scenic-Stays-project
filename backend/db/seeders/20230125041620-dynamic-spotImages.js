'use strict';

/** @type {import('sequelize-cli').Migration} */
//import models
const { Spot, SpotImage } = require('../models')

//Create data
const spotImages = [
  {
    name: 'Home by the Clouds',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/clouds.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/clouds.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/clouds.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/clouds.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/clouds.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Rural Retreat',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rural-retreat.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rural-retreat.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rural-retreat.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rural-retreat.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rural-retreat.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Modern Style in Nature',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/modern-nature.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/modern-nature.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/modern-nature.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/modern-nature.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/modern-nature.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Ski Haven',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/ski-haven.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/ski-haven.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/ski-haven.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/ski-haven.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/ski-haven.jpeg",
        preview: false
      }
    ]
  },
  // {
  //   name: '',
  //   images: [
  //     {
  //       url: "",
  //       preview: true
  //     },
  //     {
  //       url: "",
  //       preview: false
  //     },
  //     {
  //       url: "",
  //       preview: false
  //     },
  //     {
  //       url: "",
  //       preview: false
  //     },
  //     {
  //       url: "",
  //       preview: false
  //     }
  //   ]
  // },
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

