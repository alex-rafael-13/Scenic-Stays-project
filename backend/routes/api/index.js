//Init router
const router = require('express').Router();

//Test if router is working
router.post('/test', (req, res) => {
    res.json({reqBody: req.body})
})


module.exports = router;
