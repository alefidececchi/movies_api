const express = require('express');
const moviesRouter = require('./movies.js');
const seriesRouter = require('./series.js')
const carouselRouter = require('./carousel.js')
const signinRouter = require('./signin.js')
const loginRouter = require('./login.js')
const logoutRouter = require('./logout.js')

const router = express.Router();


// router.use('/user', userRouter);

router.use('/carousel', carouselRouter)
router.use('/series', seriesRouter)
router.use('/movies', moviesRouter);
router.use('/signin', signinRouter);
router.use('/logout', logoutRouter)
router.use('/login', loginRouter)
router.use('/*', (req, res) => {
    const { params } = req.params
    const querys = req.query
    console.log('hello world')
    console.log('params', params)
    console.log('querys', querys)
})

module.exports = router