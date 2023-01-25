const express = require('express')
const router = express.Router()

const { Spot, SpotImage, Booking } = require('../../db/models') 

router.post('/', (req, res) => {
    res.json({reqBody: req.body})
})

//GET api/test/spots to check if spots are in db
router.get('/spots', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: ['id']
    })

    res.json({
        spots: spots
    })
});

//GET api/test/spotImages to check if spotImages are in db
router.get('/spotImages', async (req, res) => {
    const spotImages = await SpotImage.findAll({
        attributes: ['id']
    })

    res.json({
        spots: spotImages
    })
});

//GET api/test/Bookings to check if Bookings are in db
router.get('/bookings', async (req, res) => {
    const bookings = await Booking.findAll({
        attributes: ['id']
    })

    res.json({
        bookings: bookings
    })
});

module.exports = router
