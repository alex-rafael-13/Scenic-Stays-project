const express = require('express')
const router = express.Router()

const { Spot, SpotImage, Booking, Review, ReviewImage } = require('../../db/models') 

router.post('/', (req, res) => {
    res.json({reqBody: req.body})
})

//GET api/test/spots to check if spots are in db
router.get('/spots', async (req, res) => {
    const spots = await Spot.count()

    res.json({
        spotsCount: spots
    })
});

//GET api/test/spotImages to check if spotImages are in db
router.get('/spotImages', async (req, res) => {
    const spotImages = await SpotImage.count()

    res.json({
        spotImagesCount: spotImages
    })
});

//GET api/test/Bookings to check if Bookings are in db
router.get('/bookings', async (req, res) => {
    const bookings = await Booking.count()

    res.json({
        bookingsCount: bookings
    })
});

//GET api/test/reviews to check if Bookings are in db
router.get('/reviews', async (req, res) => {
    const reviews = await Review.count()

    res.json({
        reviewsCount: reviews
    })
});

//GET api/test/reviewImages to check if Bookings are in db
router.get('/reviewImages', async (req, res) => {
    const reviewImages = await ReviewImage.count()

    res.json({
        reviewImageCount: reviewImages
    })
});

module.exports = router
