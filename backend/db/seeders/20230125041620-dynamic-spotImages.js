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
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg",
        preview: true
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/2389c1f4-1775-4a42-a0b5-126d3c7d6aa6-high-altitude-homes-for-sale-evergreen-co.jpg",
        preview: false
      }
    ]
  },
  {
    name: 'Rural Retreat',
    images: [
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/a617c97d-92e7-477a-bb7d-12470d02ed55-high-altitude-homes-snowdonia.jpg",
        preview: true
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/a617c97d-92e7-477a-bb7d-12470d02ed55-high-altitude-homes-snowdonia.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/a617c97d-92e7-477a-bb7d-12470d02ed55-high-altitude-homes-snowdonia.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/a617c97d-92e7-477a-bb7d-12470d02ed55-high-altitude-homes-snowdonia.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/a617c97d-92e7-477a-bb7d-12470d02ed55-high-altitude-homes-snowdonia.jpg",
        preview: false
      }
    ]
  },
  {
    name: 'Modern Style in Nature',
    images: [
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/f050368a-04a2-492d-97e4-5640e8ba3cfe-high-altitude-homes-for-sale-mount-macedon-oz.jpg",
        preview: true
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/f050368a-04a2-492d-97e4-5640e8ba3cfe-high-altitude-homes-for-sale-mount-macedon-oz.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/f050368a-04a2-492d-97e4-5640e8ba3cfe-high-altitude-homes-for-sale-mount-macedon-oz.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/f050368a-04a2-492d-97e4-5640e8ba3cfe-high-altitude-homes-for-sale-mount-macedon-oz.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/f050368a-04a2-492d-97e4-5640e8ba3cfe-high-altitude-homes-for-sale-mount-macedon-oz.jpg",
        preview: false
      }
    ]
  },
  {
    name: 'Ski Haven',
    images: [
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/29155d88-9247-4ece-8c70-76eb7525a7a0-high-altitude-homes-for-sale-piedmont-qc-ext.jpg",
        preview: true
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/29155d88-9247-4ece-8c70-76eb7525a7a0-high-altitude-homes-for-sale-piedmont-qc-ext.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/29155d88-9247-4ece-8c70-76eb7525a7a0-high-altitude-homes-for-sale-piedmont-qc-ext.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/29155d88-9247-4ece-8c70-76eb7525a7a0-high-altitude-homes-for-sale-piedmont-qc-ext.jpg",
        preview: false
      },
      {
        url: "https://loveincorporated.blob.core.windows.net/contentimages/gallery/29155d88-9247-4ece-8c70-76eb7525a7a0-high-altitude-homes-for-sale-piedmont-qc-ext.jpg",
        preview: false
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

