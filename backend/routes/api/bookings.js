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
                    exclude: ['createdAt', 'updatedAt', 'description'],
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

/* Edit a booking if it was made by current user
    - PUT /api/bookings/:bookingId
    - Auth required
    -Get user id from restoreUser
*/
router.put('/:bookingId', [restoreUser, requireAuth], async(req, res, next) => {
    //Get data
    const { user } = req
    const { startDate, endDate } = req.body
    const bookingId = req.params.bookingId

    const booking = await Booking.findByPk(bookingId)
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const currentDate = Date.now()
    let checkEnd
    if(booking){
        checkEnd = new Date(booking.endDate).getTime()
    }
    
    if(!booking){
        const err = Error("Couldn't find a booking with the specified id")
        err.message = "Booking couldn't be found"
        err.status = 404
        
        next(err)
    }
    //Check if curr user is autherize to edit booking
    else if(booking.userId !== user.id){
        const err = Error("Authorization Error")
        err.message = "Forbidden"
        err.status = 403

        next(err)
    }
    //IF booking has passed already throw an error
    else if(checkEnd < currentDate){
        const err = Error('Can\'t edit a booking that\' past the end date')
        err.message = "Past bookings can't be modified"
        err.status = 403
        
        next(err)
    }
    //Check if start date is after end date
    else if(start > end){
       const err = Error('Validation error')
       err.message = "endDate cannot be on or before startDate"
       err.status = 400

       next(err)
   } 
    else{
        const { Op } = require("sequelize")
        const bookings = await Booking.findAll({
            where:{
                spotId: booking.spotId,
                id: {
                    [Op.ne]: booking.id 
                },
            }
        })
        // const renter = await User.findByPk(user.id)

        //Check if dates are available
        let errMessages = {}
        for(let booking of bookings){
            const startBooking = new Date(booking.startDate).getTime()
            const endBooking = new Date(booking.endDate).getTime()

            if(start >= startBooking && start <= endBooking ){
                errMessages.startDate = "Start date conflicts with an existing booking"
            } 
            if(end >= startBooking && end <= endBooking ){
                errMessages.endDate = "End date conflicts with an existing booking"

            }
            if(start < startBooking && end > endBooking){
                errMessages.startDate = "Start date conflicts with an existing booking"   
                errMessages.endDate = "End date conflicts with an existing booking"
            }
        }
        //Check if there is error messafes
        if(Object.keys(errMessages).length !== 0){
            const err = Error('Booking conflict')
            err.status = 403
            err.errors = errMessages

            next(err)
        } 
        //If no erros, update the booking
        else {
            await Booking.update({
                startDate,
                endDate
            }, {where: {id: booking.id}})

            const updatedBooking = await Booking.findByPk(bookingId)
            res.json(updatedBooking)
        }



    }


    
})

module.exports = router
