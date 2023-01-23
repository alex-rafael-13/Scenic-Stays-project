const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router()

//Signup a new user
router.post('/', async (req, res, next) => {

    const { email, username, password} = req.body;

    //Create new User using signup method
    const user = await User.signup({username, email, password});

    //Set token cookie
    await setTokenCookie(res, user)

    return res.json({
        user: user
    })
})



module.exports = router;
