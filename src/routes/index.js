const express = require('express');
const moviesRouter = require('./movies.js');
const seriesRouter = require('./series.js')
// const userRouter = require('./user.js');
const router = express.Router();


// router.use('/user', userRouter);
// router('/*', badRequestRouter)
// router.use('/create', createRouter)
router.use('/series', seriesRouter)
router.use('/movies', moviesRouter);
router.use('/', () => {
    console.log('Hello world!')
})


module.exports = router