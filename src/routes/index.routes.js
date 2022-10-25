const express = require('express');
const moviesRouter = require('./movies.routes.js');
const userRouter = require('./user.routes.js');
const router = express.Router();


// router.use('/user', userRouter);
// router('/*', badRequestRouter)
// router.use('/', moviesRouter);
router.use('/', () => {
    console.log('Hello world!')
})


module.exports = router