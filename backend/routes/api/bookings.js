//Init express
const express = require('express');
const router = express.Router();

//Import middleware from utils and validation library
const { restoreUser, requireAuth} = require('../../utils/auth');
const {handleValidationErrors} = require('../../utils/validation');
const { check } = require('express-validator')

//Import files
const { Booking, Spot, sequelize } = require('../../db/models');

/* Get all the current user's bookings
    - GET /api/bookings/current 
    - Auth required
    -Spot info required w/ previewImage
    -Get user id from restoreUser
*/
router.get('/current', [ restoreUser, requireAuth], async (req, res, next) => {
    const { user } = req
    const bookings = await Booking.findAll({
        where:{
            userId: user.id
        },
        include: [
            {
                model: Spot
            }
        ]
    });

    //Make bookings a POJO using .toJSON
    const bookingsList = []
    for(let booking of bookings){
        bookingsList.push(booking.toJSON())
    }

    //iterate through the newly made arr and find the Spot info using spotId
    for(let booking of bookingsList){
        const spot = await Spot.findByPk(booking.spotId,
            {
                attributes:{
                    exclude: ['createdAt', 'updatedAt'],
                },
            }
        );
        //Make spot POJO
        let spotPOJO = spot.toJSON()
        //method from Spot model to find previewImages
        const previewImages = await spot.findPreviewImages(spot.id)
            
        spotPOJO.previewImage = previewImages
        booking.Spot = spotPOJO
    }
    
    res.json({Bookings: bookingsList})
})



module.exports = router
