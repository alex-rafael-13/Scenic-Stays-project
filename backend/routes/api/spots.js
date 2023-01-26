//Init express router
const express = require('express');
const router = express.Router();

//Import middleware from utils folder and Validation library
const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');













module.exports = router
