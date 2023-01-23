const express = require('express');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

//Validation middleware for signups
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

//Signup a new user
router.post('/', validateSignup, async (req, res, next) => {

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
