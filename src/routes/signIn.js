const express = require('express')
const router = express.Router()
const { postJWTFromGoogle } = require('../controllers/signIn/post.js')


router.post('/', postJWTFromGoogle);

module.exports = router;
