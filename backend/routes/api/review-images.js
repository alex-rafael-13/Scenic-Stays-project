//Init express router
const express = require('express');
const router = express.Router();

//Import middleware from utils folder and Validation library
const { restoreUser ,requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check, withMessage } = require('express-validator');

//Import models needed
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');

/* Delete review image if review was posted by user
    - DELETE /review-images/:imageId
    - Auth required
*/
router.delete('/:imageId', [restoreUser, requireAuth], async(req, res, next) => {
    const { user } = req
    const imageId = req.params.imageId

    const image = await ReviewImage.findByPk(imageId)
    
    if(!image){
        const err = Error('Couldn\'t find an Image Review with the specified id')
        err.message = "Review Image couldn't be found",
        err.status = 404 
        
        next(err)
    }
    else{
        const review = await Review.findByPk(image.reviewId)

        if(review.userId !== user.id){
            const err = Error('Forbidden')
            err.message = "Forbidden",
            err.status = 403 
    
            next(err)
        }else{
            await ReviewImage.destroy({where: {id: imageId}})

            res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        }
    }
})


module.exports = router
