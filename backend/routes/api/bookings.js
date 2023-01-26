//Init express
const express = require('express');
const router = express.Router();

//Import middleware from utils and validation library
const { restoreUSer, requireAuth} = require('../../utils/auth');
const {handleValidationErrors} = require('../../utils/validation');
const { check } = require('express-validator')

//Import files
const { Booking } = require('../../db/models');

/* Get all the current user's bookings
    - GET /api/bookings/current 


*/



module.exports = router
