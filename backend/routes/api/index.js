//Init router
const router = require('express').Router();

//Import files
const { restoreUser } = require('../../utils/auth.js');

const { User } = require('../../db/models');

//Middleware
router.use(restoreUser)

//Test if router is working
router.post('/test', (req, res) => {
    res.json({reqBody: req.body})
})



module.exports = router;
