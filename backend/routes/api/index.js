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



//Test if router is working
router.post('/test', (req, res) => {
    res.json({reqBody: req.body})
})


module.exports = router;
