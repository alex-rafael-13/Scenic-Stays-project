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
  {
    name: 'Lakeview Paradise',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/lakeview.jpg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/lakeview.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/lakeview.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/lakeview.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/lakeview.jpg",
        preview: false
      }
    ]
  },
  {
    name: 'Beach Vibes',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cayman-islands-villa-kempa-kai-2020-021-1616076929.jpg",
        preview: false
      }
    ]
  },
  {
    name: 'Aurora Cabin',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/aurora-cabin.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/aurora-cabin.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/aurora-cabin.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/aurora-cabin.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/aurora-cabin.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Mountain Luxury',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/mountain-luxury.jpg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/mountain-luxury.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/mountain-luxury.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/mountain-luxury.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/mountain-luxury.jpg",
        preview: false
      }
    ]
  },
  {
    name: 'Classical Villa',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/classical.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/classical.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/classical.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/classical.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/classical.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Hill Residence',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/hill-residence.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/hill-residence.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/hill-residence.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/hill-residence.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/hill-residence.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Viña Villa',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/vina-villa.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/vina-villa.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/vina-villa.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/vina-villa.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/vina-villa.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Rustic Mountains',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rustic.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rustic.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rustic.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rustic.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/rustic.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Nani Resort',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/nani.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/nani.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/nani.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/nani.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/nani.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Blue Beauty',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/blue.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/blue.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/blue.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/blue.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/blue.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Cabin Remedy',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cabin-remedy.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cabin-remedy.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cabin-remedy.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cabin-remedy.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/cabin-remedy.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Playa de Vida',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/playa.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/playa.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/playa.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/playa.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/playa.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Forest Escape',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/forest-escape.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/forest-escape.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/forest-escape.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/forest-escape.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/forest-escape.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Desert Oasis',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/desert-oasis.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/desert-oasis.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/desert-oasis.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/desert-oasis.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/desert-oasis.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'Villa Sagittario',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/sagittario.jpeg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/sagittario.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/sagittario.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/sagittario.jpeg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/sagittario.jpeg",
        preview: false
      }
    ]
  },
  {
    name: 'French Winter',
    images: [
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/french-winter.jpg",
        preview: true
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/french-winter.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/french-winter.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/french-winter.jpg",
        preview: false
      },
      {
        url: "https://scenic-stays.s3.us-west-1.amazonaws.com/public/french-winter.jpg",
        preview: false
      }
    ]
  },
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

