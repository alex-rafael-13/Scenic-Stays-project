const express = require('express');

const router = express.Router();

const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models')

//Login to Session
router.post('/', async (req, res, next) => {

    const { credential, password} = req.body

    //Log in User using login method
    const user = await User.login({ credential, password})

    //Send Error if login failed
    if(!user){
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }

    //Set token cookie if login is successful
    await setTokenCookie(res, user);

    return res.json({
        user: user
    });
});

//Logout of Session 
router.delete('/', (_req, res, next) => {
    res.clearCookie('token')
    return res.json({message:'Success'})
})







module.exports = router
