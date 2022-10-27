const express = require('express');
const moviesRouter = require('./movies.js');
const seriesRouter = require('./series.js')
const carouselRouter = require('./carousel.js')

const router = express.Router();


// router.use('/user', userRouter);

router.use('/carousel', carouselRouter)
router.use('/series', seriesRouter)
router.use('/movies', moviesRouter);
router.use('/*', () => {
    console.log('Hello world!')
})


module.exports = router