const express = require('express')
const router = express.Router()
const { postJWTFromGoogle } = require('../controllers/signin/post.js')


router.post('/', postJWTFromGoogle);

module.exports = router;