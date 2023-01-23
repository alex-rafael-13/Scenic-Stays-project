const express = require('express');

const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')

//Validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

//Login to Session
router.post('/', validateLogin, async (req, res, next) => {

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

//Get Session
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({ user: null });
});





module.exports = router
