const express = require('express')
const router = express.Router()

const { Spot, SpotImage } = require('../../db/models') 

router.post('/', (req, res) => {
    res.json({reqBody: req.body})
})

//GET api/test/spots to check if spots are in db
router.get('/spots', async (req, res) => {
    const spots = await Spot.findAll({
        attributes: ['name']
    })

    res.json({
        spots: spots
    })
});

//GET api/test/spotImages to check if spotImages are in db
router.get('/spotImages', async (req, res) => {
    const spotImages = await SpotImage.findAll({
        attributes: ['url']
    })

    res.json({
        spots: spotImages
    })
});

module.exports = router
