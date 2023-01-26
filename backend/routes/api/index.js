//Init router
const router = require('express').Router();

//Import files
const sessionRouter = require('./session.js');
const { restoreUser } = require('../../utils/auth.js');
const { User } = require('../../db/models');


//------------------------ Middleware ------------------------//
router.use(restoreUser)

//------------------------ Routers ------------------------//
//Session Router
router.use('/session', sessionRouter);

//User Router
const usersRouter = require('./users.js')
router.use('/users', usersRouter)

//Spots Router
const spotsRouter = require('./spots')
router.use('/spots', spotsRouter)


//MY TEST FILE:
const testRouter  = require('./test.js')
//TEST ROUTER
router.use( '/test', testRouter)


module.exports = router;
