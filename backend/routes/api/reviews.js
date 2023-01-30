//Init express router
const express = require('express');
const router = express.Router();

//Import middleware from utils folder and Validation library
const { restoreUser ,requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check, withMessage } = require('express-validator');

//Import models needed
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const review = require('../../db/models/review');

/* GET reviews by current user
    - Auth required
    - GET /api/spots/:spotId/review
*/
router.get('/current', [restoreUser, requireAuth], async(req, res, next) => {
    const {user} = req

    const reviews = await Review.findAll({
        where: {
            userId: user.id
        }
    })

    let reviewList = []
    for(let review of reviews){
        reviewList.push(review.toJSON())
    }

    for(let review of reviewList){
        //Get info for user
        const user = await User.findByPk(review.userId, {
            attributes: ['id', 'firstName', 'lastName']
        })
        //Get info for spot
        const spot = await Spot.findByPk(review.id,{
            attributes:{
                exclude:['updatedAt', 'createdAt', 'description']
            }
        });
        const previewImage = await spot.findPreviewImages(spot.id)
        let spotObj = spot.toJSON()
        spotObj.previewImage = previewImage

        //Get info for reviewImages
        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            }
        })

        review.User = user
        review.Spot = spotObj
        review.ReviewImages = reviewImages
    }

    res.json({Reviews: reviewList})

})


module.exports = router
