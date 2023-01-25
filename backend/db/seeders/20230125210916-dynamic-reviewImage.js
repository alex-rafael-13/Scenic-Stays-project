'use strict';

const { Review, ReviewImage } = require('../models')

const images = [
  {
    review: 'Love what Shuri has done with the place!',
    urls: [
      {
        url: 'review-url-1'
      },
      {
        url: 'review-url-2'
      },
      ]
  },
  {
    review: 'Kind of destroyed after Loki attacked it',
    urls: [
      {
        url: 'review-url-1'
      },
      {
        url: 'review-url-2'
      },
      {
        url: 'review-url-3'
      },
      {
        url: 'review-url-4'
      },
      {
        url: 'review-url-5'
      },
      {
        url: 'review-url-6'
      },
      {
        url: 'review-url-7'
      },
      {
        url: 'review-url-8'
      },
      {
        url: 'review-url-9'
      },
      {
        url: 'review-url-10'
      },
    ]
  },
  {
    review: 'Historic place, 10/10 would recommend',
    urls: [
      {
        url: 'review-url-1'
      },
      {
        url: 'review-url-2'
      }
    ]
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for(let i = 0; i < images.length; i++){
      const { review, urls} = images[i]

      const spotReview = await Review.findOne({where: {review}});

      for(let url of urls){

        ReviewImage.create({...url, reviewId: spotReview.id})
      }
    }

    
  },

  async down (queryInterface, Sequelize) {
    for(let i = 0; i < images.length; i++){
      const { review, urls} = images[i]

      const spotReview = await Review.findOne({where: {review}});

      for(let url of urls){

        ReviewImage.destroy({where:{...url, reviewId: spotReview.id}})
      }
    }
  }
};
