'use strict';

const { Review, ReviewImage } = require('../models')

const images = [
  {
    review: 'Modern lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam.',
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
    review: 'Clouds lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam.',
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
    review: 'Ski lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi ipsum faucibus vitae aliquet nec. Mauris augue neque gravida in. Hendrerit gravida rutrum quisque non tellus orci. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Nibh cras pulvinar mattis nunc sed blandit libero. Felis eget nunc lobortis mattis aliquam.',
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
    const reviews = await Review.findAll()
    // console.log(reviews)
    for(let i = 0; i < images.length; i++){
      const {urls} = images[i]
      const reviewId = reviews[i].id
      // console.log(reviewId)
      // const spotReview = await Review.findOne({where: {id:reviewId}});

      for(let url of urls){

       await ReviewImage.create({...url, reviewId})
      }
    }

    
  },

  async down (queryInterface, Sequelize) {
    const reviews = await Review.findAll()
    
    for(let i = 0; i < images.length; i++){
      const {urls} = images[i]
      const reviewId = reviews[i].id

      // const spotReview = await Review.findOne({where: {id:reviewId}});
      
      for(let url of urls){

        await ReviewImage.destroy({where:{...url, reviewId}})
      }
    }
  }
};
