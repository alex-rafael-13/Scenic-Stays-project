const express = require('express');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

//Validation middleware for signups
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true})
        .isLength({min: 2})
        .withMessage('First Name must be at least 2 characters long'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('First Name cannot be an email.'),
    check('lastName')
        .exists({ checkFalsy: true})
        .isLength({min: 2})
        .withMessage('Last Name must be at least 2 characters long'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('Last Name cannot be an email.'),
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

    const { firstName, lastName, email, username, password} = req.body;

    //Create new User using signup method
    const user = await User.signup({firstName, lastName, username, email, password});

    //Set token cookie
    await setTokenCookie(res, user)

    return res.json({
        user: user
    })
})

//Work in Progress
router.get('/all', async(req, res, next) => {

  // const users = await 

  return res.json({
    test: 'test'
  })

})

module.exports = router;
