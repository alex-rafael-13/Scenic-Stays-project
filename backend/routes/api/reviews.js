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

/* Post a review image using its id
    - POST /reviews/:reviewId/images
    - require Auth
*/
router.post('/:reviewId/images', [restoreUser, requireAuth], async (req, res, next) => {
    const { user } = req
    const { url } = req.body
    const reviewId = req.params.reviewId

    const review = await Review.findByPk(reviewId)
    
    if(!review){
        const err = Error('Couldn\'t find a Review with the specified id')
        err.message = "Review couldn't be found",
        err.status = 404 

        next(err)
    } else if(review.userId !== user.id){
        const err = Error('Forbidden')
        err.message = "Forbidden",
        err.status = 403 

        next(err)
    } else{
        const reviewImageCount = await ReviewImage.count({
            where:{
                reviewId: reviewId
            }
        });

        //Check if max is met alreade
        if(reviewImageCount >= 10){
            const err = Error("Maximum number of images for this resource was reached")
            err.message = "Maximum number of images for this resource was reached"
            err.status = 403

            next(err)
        } else{
            const newReviewImage = await ReviewImage.create({
                reviewId: parseInt(reviewId),
                url: url
            })

            let resBody = newReviewImage.toJSON()
            delete resBody.reviewId
            delete resBody.updatedAt
            delete resBody.createdAt

            res.json(resBody)
        }
        
    }
})

const valReview = [
    check('review', 'Review text is required')
        .notEmpty()
        .bail()
        .isString(),
    check('stars', 'Stars must be an integer from 1 to 5')
        .isInt()
        .bail() 
        .custom(value => {return (value <= 5 && value >= 1)}),
    handleValidationErrors
]

/* Edit a review if the owner is logged in
    - PUT /:reviewId
    - require Auth
*/

router.put('/:reviewId', [restoreUser, requireAuth, valReview], async(req, res, next) => {
    const { user } = req
    const reviewId = req.params.reviewId
    const { review, stars} = req.body

    const checkReview = await Review.findByPk(reviewId)

    if(!checkReview){
        const err = Error('Couldn\'t find a Review with the specified id')
        err.message = "Review couldn't be found",
        err.status = 404 

        next(err)
    }else if(checkReview.userId !== user.id){
        const err = Error('Forbidden')
        err.message = "Forbidden",
        err.status = 403 

        next(err)
    } else{
        await Review.update({
            stars,
            review
        }, {where:{id: reviewId}})

        const updated = await Review.findByPk(reviewId)
        res.json(updated)
    }
})

/* Delete a review if the user created it
    - DELETE /reviews/:reviewId
    - Require auth
*/
router.delete('/:reviewId', [restoreUser, requireAuth], async(req, res, next) => {
    const { user } = req
    const reviewId = req.params.reviewId

    const checkReview = await Review.findByPk(reviewId)

    if(!checkReview){
        const err = Error('Couldn\'t find a Review with the specified id')
        err.message = "Review couldn't be found",
        err.status = 404 

        next(err)
    }else if(checkReview.userId !== user.id){
        const err = Error('Forbidden')
        err.message = "Forbidden",
        err.status = 403 

        next(err)
    } else{
        await Review.destroy({
            where: {
                id: reviewId
            }
        })

        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})

module.exports = router
